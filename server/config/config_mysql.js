'use strict';

/**
 * Mysql configuration , require in models and start using
 */

var mysql = require('mysql2');
var config = require('./config_main');

module.exports = {
  /**
  * create mysql pool connection of 10 available connections. one statement
  * @return {object} connection
  */
  pool: function () {
    // console.time('connect to pool');
    var pool = mysql.createPool({
      connectionLimit: 10,
      host: config.mysql.host,
      port: config.mysql.port,
      user: config.mysql.user,
      password: config.mysql.password,
      database: config.mysql.dbName,
      debug: false
    });
    // console.timeEnd('connect to pool');

    return pool;
  },

  /**
  * create mysql pool connection of 10 available connections. multiple statement
  * @return {object} connection
  */
  multiplePool: function () {
    // console.time('connect to multiple pool');
    var pool = mysql.createPool({
      connectionLimit: 10,
      host: config.mysql.host,
      port: config.mysql.port,
      user: config.mysql.user,
      password: config.mysql.password,
      database: config.mysql.dbName,
      acquireTimeout: 50000,
      multipleStatements: true
    });
    // console.timeEnd('connect to multiple pool');

    return pool;
  }
};
