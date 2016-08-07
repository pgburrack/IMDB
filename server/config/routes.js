'use strict';

var Router = require('koa-router')();
var AuthController = require('../controllers/AuthController');
var Utils = require('../helpers/Utils');

module.exports = function (app) {
  /**  API router **/
  Router
    .post('/api/login', AuthController.validUser)
    .get('/api/logout', Utils.secured, AuthController.logout)
    // admin view api requests
    .get('/api/userslist', Utils.superUserAccess, AuthController.UsersList)
    .post('/api/new_user', Utils.superUserAccess, AuthController.AddNewUser)
    .post('/api/edit_user', Utils.superUserAccess, AuthController.EditUser)
    // core
    .get('/api/publishers', Utils.secured, require('../controllers/CoreController').FetchPublishers)
    // alarms
    // fetch publishers
    .get('/api/lists', Utils.secured, require('../controllers/AlarmsController').FetchListsData)
    .get('/api/alarms', Utils.secured, require('../controllers/AlarmsController').FetchAlarmApi)
    .get('/api/campaigns', Utils.secured, require('../controllers/AlarmsController').FetchCampaigns)
    .get('/api/alarms/user', Utils.secured, require('../controllers/AlarmsController').FetchUser)
    .post('/api/alarms/new', Utils.secured, require('../controllers/AlarmsController').AddNewAlarm)
    .post('/api/alarms/edit', Utils.secured, require('../controllers/AlarmsController').EditAlarm)
    // change logs
    .get('/api/logs', Utils.secured, require('../controllers/LogController').InitialLogs)
    // campaigns
    .get('/api/campaigns/:publisher_id', Utils.secured, require('../controllers/CampaignsController').FetchPublisherCampaigns)
    .post('/api/campaigns/blacklist/save', Utils.secured, require('../controllers/CampaignsController').SavePublisherBlacklist);

  app
    .use(Router.routes())
    .use(Router.allowedMethods());
};
