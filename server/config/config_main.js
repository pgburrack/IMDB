'use strict';

/**
 * Environment variables and application configuration.
 */

/* Set environment for configuration */
var env = process.env.NODE_ENV;

var envConfig = {
  development: {
    app: {
      env: 'development',
      cacheTime: 7 * 24 * 60 * 60 * 1000, /* default caching time (7 days) for static files, calculated in milliseconds - optionally if not using nginx */
      port: process.env.PORT || 3000
    },
    mysql: {
      engine: 'mysql.engine',
      host: 'mysql.host',
      port: 'port.0000',
      dbName: 'data_base_name',
      user: 'user',
      password: 'password',
      debug: true
    },
    elasticDashboard: {
      host: 'http://10.0.30.108:9418',
      maxSockets: 10,
      sniffOnStart: true,
      keepAlive: true,
      suggestCompression: false //  The client should inform Elasticsearch, on each request, that it can accept compressed responses
    }
  },

  test: {
    app: {
      env: 'test',
      port: 3001
    },
    mysql: {
      engine: 'mysql.engine',
      host: 'mysql.host',
      port: 'port.0000',
      dbName: 'data_base_name',
      user: 'user',
      password: 'password',
      debug: false
    }
  },

  production: {
    app: {
      env: 'production',
      port: process.env.PORT || 3000,
      cacheTime: 7 * 24 * 60 * 60 * 1000 /* default caching time (7 days) for static files, calculated in milliseconds - optionally if not using nginx */
    },
    mysql: {
      engine: 'mysql.engine',
      host: 'mysql.host',
      port: 'port.0000',
      dbName: 'data_base_name',
      user: 'user',
      password: 'password',
      debug: false
    },
    elasticDashboard: {
      host: 'http://10.0.30.210:9418',
      maxSockets: 10,
      sniffOnStart: true,
      keepAlive: true,
      suggestCompression: false //  The client should inform Elasticsearch, on each request, that it can accept compressed responses
    }
  }
};

// override the base configuration with the platform specific values
module.exports = envConfig[env] || envConfig['development'];
