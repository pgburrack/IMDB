'use strict';

var AlarmsModel = require('../models/alarms_model'),
    jwt = require('jwt-simple'),
    JWT_SECRET = require('../helpers/ConstUtility')["JWT_SECRET"];

module.exports = {

    /**
     * fetch Alarm Api - configuration and alarm list
     * @param  {object}   ctx  [this]
     * @param  {Function} next [description]
     * @return {object}
     */
    FetchAlarmApi : async (ctx, next) => {
        console.time('FetchAlarmApi');
        let user = ctx.session.hasOwnProperty("userDetails") ? ctx.session.userDetails.userName : "";
        let res = await Promise.all([AlarmsModel.alarmsListModel(user), AlarmsModel.alarmsConfigModel()]);

        ctx.status = 200;
        ctx.set('Content-Type', 'application/json');
        console.time('FetchAlarmApi');
        ctx.body = { list : jwt.encode(res[0], JWT_SECRET), config : jwt.encode(res[1], JWT_SECRET) };
    },

    /**
     * get list of all campaigns
     * @param  {object}   ctx  [this]
     * @param  {Function} next
     * @return {object}
     */
    FetchCampaigns : async (ctx, next) => {
        console.time('FetchCampaigns');
        let res = await Promise.all([AlarmsModel.alarmsCampaignListModel()]);

        ctx.status = 200;
        ctx.set('Content-Type', 'application/json');
        console.timeEnd('FetchCampaigns');
        ctx.body = { campaigns : jwt.encode(res[1], JWT_SECRET) };
    },

    /**
     * query for user mail by string
     * @param  {object}   ctx  [this]
     * @param  {Function} next
     * @return {object}
     */
    FetchUser : async function (ctx, next) {
        if(!ctx.query.hasOwnProperty("q") || ctx.query.q.length == 0)
            return ctx.body = await { status : "missings params" }

        let user = await AlarmsModel.searchUser(ctx.query.q);
        ctx.status = 200;
        ctx.body = user;
    },

    /**
     * add new alarm to elasticsearch
     * @param  {object}   ctx  [this]
     * @param  {Function} next
     * @return {object}
     */
    AddNewAlarm : async function (ctx, next) {
        let postParams = ctx.request.body;
        ctx.set('Content-Type', 'application/json');
        if(!postParams.hasOwnProperty("name") && !postParams.hasOwnProperty("predicate"))
            return ctx.body = await { status : "missings params"};

        let user = ctx.session.hasOwnProperty("userDetails") ? ctx.session.userDetails.userEmail : "",
            saveResponse = await AlarmsModel.alarmSaveModel(postParams, user);
        ctx.status = 200;
        ctx.body = { res : jwt.encode(saveResponse, JWT_SECRET)};
    },

    /**
     * edit existing alarm
     * @param  {object}   ctx  [this]
     * @param  {Function} next
     * @return {object}
     */
    EditAlarm : async function (ctx, next) {
       let postParams = ctx.request.body;
        ctx.set('Content-Type', 'application/json');
        if(!postParams.hasOwnProperty("name") && !postParams.hasOwnProperty("id"))
            return ctx.body = await { status : "missings params"};

        let user = ctx.session.hasOwnProperty("userDetails") ? ctx.session.userDetails.userEmail : "",
            saveResponse = await AlarmsModel.alarmSaveModel(postParams, user);
        ctx.status = 200;
        ctx.body = { res : jwt.encode(saveResponse, JWT_SECRET)};
    },

    /**
     * fetch lists of campaigns and publishers
     * @param {Function} next          [description]
     * @yield {[json]}   [campaigns & publishers results]
     */
    FetchListsData : async function (ctx, next) {
        console.time('FetchListsData');
        let res = await Promise.all([AlarmsModel.alarmsPublishersListModel(), AlarmsModel.alarmsCampaignListModel()]);

        ctx.status = 200;
        ctx.set('Content-Type', 'application/json');
        console.timeEnd('FetchListsData');
        ctx.body = { publishers : jwt.encode(res[0], JWT_SECRET), campaigns : jwt.encode(res[1], JWT_SECRET) };
    }
}

