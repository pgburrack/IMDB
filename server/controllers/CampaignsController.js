'use strict';

var CampaignsModel = require('../models/campaigns_model'),
    jwt = require('jwt-simple'),
    JWT_SECRET = require('../helpers/ConstUtility')["JWT_SECRET"];

module.exports = {

    /**
     * get publisher campaigns by publisher id
     * @param  {object}   ctx  [this]
     * @param  {Function} next
     * @return {object}
     */
    FetchPublisherCampaigns : async function (ctx, next) {
        if(!ctx.params.hasOwnProperty("publisher_id") && ctx.params.publisher_id.length == 0)
            return ctx.body = { status : "missings params"};

        console.time('FetchPublisherCampaigns');
        var req = await CampaignsModel.campaignsListModel(ctx.params.publisher_id);

        ctx.status = 200;
        ctx.set('Content-Type', 'application/json');
        console.timeEnd('FetchPublisherCampaigns');
        ctx.body = { list : jwt.encode(req, JWT_SECRET) };
    },

    /**
     * save publisher black list
     * @param  {object}   ctx  [this]
     * @param  {Function} next
     * @return {object}
     */
    SavePublisherBlacklist : async function (ctx, next) {
        let postParams = ctx.request.body;
        if(!postParams.hasOwnProperty("c") && !postParams.hasOwnProperty("pi"))
            return ctx.body = { status : "missings params"};

        console.time('SavePublisherBlacklist');
        let user = ctx.session.hasOwnProperty("userDetails") ? ctx.session.userDetails.userEmail : '';
        let req = await CampaignsModel.savePublisherBlacklist(postParams, user);

        ctx.status = 200;
        ctx.set('Content-Type', 'application/json');
        console.timeEnd('SavePublisherBlacklist');
        ctx.body = { list : jwt.encode(req, JWT_SECRET) };
    }
}
