'use strict';

/**
 * ElasticSearch configuration , require in models and start using
 */

const elasticsearch = require('elasticsearch');
const CustomESHTTPConnector = require('./custom_es_connection');
let config = require('./config_main');

module.exports = {
  connectGrank: function () {
    config.elasticGrank['connectionClass'] = CustomESHTTPConnector;
    return new elasticsearch.Client(config.elasticGrank);
  },

  connectDashboard: function () {
    config.elasticDashboard['connectionClass'] = CustomESHTTPConnector;
    return new elasticsearch.Client(config.elasticDashboard);
  }
};
