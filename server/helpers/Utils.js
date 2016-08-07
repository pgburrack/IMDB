'use strict';

var fs = require('fs'),
    Logger = require('../helpers/LoggerUtility');

module.exports = {

    readHtmlFile  : function(src) {
          return new Promise(function (resolve, reject) {
            fs.readFile(src, {'encoding': 'utf8'}, function (err, data) {
              if(err) return reject(err);

              resolve(data);
            });
          });
    },

    secured : async function (ctx, next) {
        if (ctx.isAuthenticated()) {
          await next();
        } else {
          ctx.set('Content-Type', 'application/json');
          ctx.status = 302;
          ctx.body = { staus: "Not Allowed"};
        }
    },

    superUserAccess : async function (ctx, next) {
       if(ctx.isAuthenticated() && ctx.session.userDetails.permission == 1) {
          await next();
       }else{
          ctx.set('Content-Type', 'application/json');
          ctx.status = 302;
          ctx.body = { staus: "Not Allowed"};
       }
    },

    createChangeLogMsg : function (msgObj) {
      global.ESDB.create({
        index: 'change_log',
        type: 'message',
        body : msgObj
      }
      , function (error, response){
        if(error) {
           Logger.info("Error on creating change log message", error);
        }
        Logger.info("Creating change log message", response);
      });

    },

    module_exists : function ( name ) {
        try { return require.resolve( name ) }
        catch( e ) { return false }
    }
}
