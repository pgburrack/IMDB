'use strict';

var pbkdf2 = require('pbkdf2'),
    moment = require('moment'),
    DATE_ES_FORMAT = require("../helpers/ConstUtility")["DATE_ES_FORMAT"],
    Logger = require('../helpers/LoggerUtility');


module.exports = {

    /**
     * [getUser description]
     * @param  {object} userInp [user name & user password]
     * @return {object}         [user details]
     */
    getUser : function(userInp){
        return new Promise(function (resolve, reject) {
            global.ESDB.search({
               index : 'users',
               type: "user_params",
               q :  'user_name:' + userInp.username
            }, function(err, response, status){

                if(err) reject(err);
                if(response.hits.total == 0) return resolve({ err : "Incorrect username" });

                var res = response.hits.hits[0]._source,
                    userId = response.hits.hits[0]._id,
                    validateUser = module.exports.validatePassword(userInp["password"], res.password);

                if(!res.user_status) return resolve({ err : "Unactive user" });
                if(!validateUser) return resolve({ err : "Incorrect password" });

                resolve({ userId : userId, userName: res.user_name, userEmail: res.mail, user_tumb: res.user_thumb, permission : res.permission })
            })
        });
    },

    /**
      * validate user password against hashed data base password || userHash = pbkdf2-sha256$12000$<salt>$<password>
      * @param  {string} pass       [user input password]
      * @param  {string} djangoHash [data base user hashed password]
      * @return {boolean}           [return true or false]
      */
     validatePassword : function (pass, userHash) {
          var parts = userHash.split('$');
          var iterations = parseInt(parts[1]);
          var salt = parts[2];

       return pbkdf2.pbkdf2Sync(pass, new Buffer(salt), iterations, 32, 'sha256').toString('base64') === parts[3];
     },

     usersList : function () {
        // check user permission
        return new Promise(function (resolve, reject) {
           global.ESDB.search({
              size: 50,
              index : 'users',
              type: 'user_params',
              _source: ["user_name", "mail", "user_status", "pd_token", "permission"],
           }
           , function(err, response, status){
            if(err) reject(err);
            if(response.hits.total == 0) return resolve([]);

            var usersList = response.hits.hits.map(function (user){
               return {
                  id: user["_id"],
                  user_status: user["_source"].user_status,
                  mail: user["_source"].mail,
                  user_name: user["_source"].user_name,
                  permission: module.exports.getPermissionStr(user["_source"].permission),
                  pd_token: user["_source"].pd_token
               }
            });
            resolve(usersList);
           })
        });
     },

     /**
      *
      * @param {[type]} password      [description]
      * @param {[type]} username      [description]
      * @param {[type]} mail          [description]
      * @yield {[type]} [description]
      */
     addNewUser : async function (post, user) {
        var newUser = await module.exports.checkIfUserExist(post.user_name);
        if(newUser) return false;

        var permissionInt = await module.exports.setPermission(post.permission),
            now = new Date(),
            logMsg = 'User ' + user  + " Created new User "  + post.user_name + ' Details: ' + post.mail,
            ChangeLog = {
               created :  moment(now).format(DATE_ES_FORMAT),
               type: "system",
               user_log : user,
               message : logMsg
            };
        return new Promise(function (resolve, reject) {
           var salt = Math.random().toString(36).substr(2, 10),
               encryptPass = pbkdf2.pbkdf2Sync(post.password, salt, 12000, 32, 'sha256').toString('base64'),
               finalPass = 'pbkdf2-sha256$12000$' + salt + '$' + encryptPass;

           var UserObj = module.exports.UserMappingObj(post, finalPass, salt, permissionInt, now);
           global.ESDB.create({
              index: "users",
              type: "user_params",
              body: UserObj
           }, function(err, response, status){
              if(err) reject(err);

              require('../helpers/Utils').createChangeLogMsg(ChangeLog);
              resolve({ id: response["_id"], created : response["creatd"] });
           });
        })
        return true;
     },

     /**
      * create elastic creation object
      * @param {object} post           [user post params]
      * @param {string} finalPass      [encrypted password]
      * @param {string} salt           [prefix]
      * @param {integer} permissionInt [permission integer]
      * @param {string} now            [new Date]
      */
     UserMappingObj : function(post, finalPass, salt, permissionInt, now) {
        return {
            password: finalPass,
            last_login: moment(now).format(DATE_ES_FORMAT),
            user_name: post.user_name,
            mail: post.mail,
            salt: salt,
            user_status: post.user_status,
            created_date: moment(now).format(DATE_ES_FORMAT),
            pd_token: post.pd_token,
            user_thumb:"aadasdasd",
            permission: permissionInt
        }
     },

     /**
      * edit user details
      * @param {object} post  [description]
      * @param {string} user  [use email]
      * @yield {object} action id and status
      */
     EditUser : async function (post, user) {
         var salt,
             finalPass,
             now = new Date(),
             permissionInt = await module.exports.setPermission(post.permission),
             logMsg = 'User ' + user  + " Edited User "  + post.user_name + ' Details: ' + post.mail,
             ChangeLog = {
               created :  moment(now).format(DATE_ES_FORMAT),
               type: "system",
               user_log : user,
               message : logMsg
             };

         if(post.password.length == 0){
            var passDetails = await module.exports.fetchUserPassword(post.id);
            if(!passDetails) return { err : "Unexist user" };
            salt = passDetails.salt;
            finalPass = passDetails.password;
         }else{
            salt = Math.random().toString(36).substr(2, 10);
            var encryptPass = pbkdf2.pbkdf2Sync(post.password, salt, 12000, 32, 'sha256').toString('base64');
            finalPass = 'pbkdf2-sha256$12000$' + salt + '$' + encryptPass;
         }
         return new Promise(function (resolve, reject) {
            var UserObj = module.exports.UserMappingObj(post, finalPass, salt, permissionInt, now);
            global.ESDB.update({
              index: 'users',
              type: 'user_params',
              id: post.id,
              body: {
                doc: UserObj
              }
            }, function (error, response) {
               if(error) reject(error);

               require('../helpers/Utils').createChangeLogMsg(ChangeLog);
               resolve({id: response["_id"], created: response["created"]});
            });
         });

     },

     /**
      * if password is empty, fetch old password and salt
      * @param {string} userId   [description]
      * @yield {object} user password and salt
      */
     fetchUserPassword : function (userId) {
        return new Promise(function (resolve, reject) {
           global.ESDB.search({
             index: "users",
             type: "user_params",
             q : '_id:' + userId
           }, function(err, response, status){
              if(err) reject(err);
              if(response.hits.total == 0) return resolve(false);

              var res = response.hits.hits[0]["_source"];
              resolve({
                password: res.password,
                salt: res.salt
              })
           })
        });
     },

     /**
      * set user permission by string comming from request
      * @param {string} permission    [description]
      * @yield {integer} user permission
      */
     setPermission : function (permission) {
        switch (permission) {
           case "admin":
              return 1
              break;
           case "client":
              return 2
              break;
           case "algo":
              return 3
              break;
           case "analyst":
              return 4
              break;
           case "sale":
              return 5
              break;
        }
     },

     /**
      * get permission string from integer
      * @param {integer]} p             [description]
      * @yield {string} [description]
      */
     getPermissionStr : function (p) {
        switch (p) {
           case 1:
              return "admin"
              break;
           case 2:
              return "client"
              break;
           case 3:
              return "algo"
              break;
           case 4:
              return "analyst"
              break;
           case 5:
              return "sale"
              break;
        }
     },

     /**
      * [*checkIfUserExist description]
      * @param {[type]} username      [description]
      * @yield {[type]} [description]
      */
     checkIfUserExist : function (username) {
        return new Promise(function (resolve, reject) {
            global.ESDB.searchExists({
                index: 'users',
                type: "user_params",
                q : 'user_name:' + username
            }, function(err, response, status){
                if(response == undefined) reject(err);
                resolve(response.exists);
            });
        })
     }
}

