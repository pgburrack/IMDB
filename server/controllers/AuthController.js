'use strict';

var fs = require('co-fs'),
    passport = require('koa-passport'),
    jwt = require('jwt-simple'),
    AuthModel = require('../models/auth_model'),
    constUtil = require('../helpers/ConstUtility'),
    Utils = require('../helpers/Utils'),
    JWT_SECRET = constUtil["JWT_SECRET"],
    addedMenuConst = constUtil["addedMenu"];

module.exports = {

    /**
     * post login validate user and password
     * @param  {object}   ctx  [thia object]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    validUser : async function(ctx, next) {
       return await passport.authenticate('local', async function(user, info, status) {
          if (user === false) {
            ctx.status = 401
            ctx.body = { success: info.message };
          } else {
            ctx.session.userDetails = { userId : user.userId, userEmail : user.userEmail, userThumb : user.user_thumb, userName: user.userName, permission : user.permission };

            var addedMenu = [];
            if(user.permission == 1) addedMenu = addedMenuConst;
            await ctx.login(user);
            ctx.status = 200;
            ctx.body = { success: true , user: jwt.encode(user, JWT_SECRET), menu : jwt.encode(addedMenu, JWT_SECRET) };
          }
       })(ctx, next);
    },

    /**
     * logout from application. destroy session
     * @yield {[type]} [description]
     */
    logout : function(ctx, next) {
       ctx.logout();
       delete ctx.session.userDetails;
       ctx.status = 200;
       ctx.body = { success: true };
    },

    /**
     * get users list for users with admin permission
     * @param  {object}   ctx  [this]
     * @param  {Function} next [description]
     * @return {array}         [users list]
     */
    UsersList : async function (ctx, next) {
       let usersList = await AuthModel.usersList();
       ctx.status = 200;
       ctx.body = usersList;
    },

    /**
     * add new user - users with admin permission
     * @param  {object}   ctx  [this]
     * @param  {Function} next [description]
     * @return {object}        [request status]
     */
    AddNewUser : async function (ctx, next) {
       let postParams = ctx.request.body
       if(!postParams.hasOwnProperty("username") && !postParams.hasOwnProperty("password"))
        return ctx.body = [];

       let user = ctx.session.hasOwnProperty("userDetails") ? ctx.session.userDetails.userName : "about";
       let addUser = await AuthModel.addNewUser(postParams, user);
       ctx.status = 200;
       ctx.body = addUser;

    },

    /**
     * edit exists users by permmited admin user
     * @param  {object}   ctx  [this]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    EditUser : async function (ctx, next) {
       let postParams = ctx.request.body
       if(!postParams.hasOwnProperty("username") && !postParams.hasOwnProperty("mail"))
        return ctx.body = [];

       let user = ctx.session.hasOwnProperty("userDetails") ? ctx.session.userDetails.userName : "about";
       let addUser = await AuthModel.EditUser(postParams, user);
       ctx.status = 200;
       ctx.body = {};
    }
}




