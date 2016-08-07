'use strict';

var LogsModel = require('../models/logs_model'),
    jwt = require('jwt-simple'),
    moment = require('moment'),
    ConstUtility = require('../helpers/ConstUtility'),
    DATE_ES_FORMAT = ConstUtility["DATE_ES_FORMAT"],
    JWT_SECRET = ConstUtility["JWT_SECRET"];

var LogController = {

    /**
     * get change logs by date range
     * @param  {object}   ctx  [this]
     * @param  {Function} next
     * @return {object}
     */
    InitialLogs : async function (ctx, next) {
        console.time('InitialLogs');
        var end = ctx.query.hasOwnProperty("end") ? moment.unix(ctx.query.end).format(DATE_ES_FORMAT) : moment().format(DATE_ES_FORMAT),
            start = ctx.query.hasOwnProperty("start") ? moment.unix(ctx.query.start).format(DATE_ES_FORMAT) : moment().subtract(1, 'days').format(DATE_ES_FORMAT);

        var res = await LogsModel.logsListModel(end, start);

        ctx.status = 200;
        ctx.set('Content-Type', 'application/json');
        console.timeEnd('InitialLogs');
        ctx.body = { list : jwt.encode(res["list"], JWT_SECRET), config : jwt.encode(res["types"], JWT_SECRET) };
    }
}

module.exports = LogController;
