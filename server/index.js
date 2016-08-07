'use strict';
/**
 * MVC entry for API server app production and development mode
 */
var config = require('./config/config_main'),
    koaConfig = require('./config/config_koa'),
    koa = require('koa'),
    co = require('co'),
    app = new koa();

module.exports = app;

/**
 * Initiates a new APP server. Returns a promise.
 * @param {[type]} )
 * @yield {[type]} [description]
 */
app.init = co.wrap(function *() {

   // koa config
   koaConfig(app);

   // Routes
   require("./config/routes")( app );

   // create http server and start listening for requests
   app.server = app.listen(config.app.port);
   if (config.app.env !== 'test') {
     console.log('server:app - APP listening on port ' + config.app.port);
   }
});

// auto init if this app is not being initialized by another module (i.e. using require('./app').init();)
if (!module.parent) {
  app.init();
  app.on('error', function(err){
     console.log(err.message);
  });
}


