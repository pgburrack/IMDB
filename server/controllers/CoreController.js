import jwt from 'jwt-simple'
import { JWT_SECRET } from '../helpers/ConstUtility'
import CoreModel from '../models/core_model'

var CoreController =  {
    /**
     * get list of all campaigns
     * @param  {object}   ctx  [this]
     * @param  {Function} next
     * @return {object}
     */
    FetchPublishers : async (ctx, next) => {
        console.time('FetchPublishers');
        let res = await Promise.all([CoreModel.alarmsPublishersListModel()]);

        ctx.status = 200;
        ctx.set('Content-Type', 'application/json');
        console.timeEnd('FetchPublishers');
        ctx.body = { publishers : jwt.encode(res[0], JWT_SECRET) };
    }
}

module.exports = CoreController
