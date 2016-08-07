'use strict';

let moment = require('moment'),
    DATE_ES_FORMAT = require("../helpers/ConstUtility")["DATE_ES_FORMAT"];


let campaignsModel = {

    /**
     * fetch campaigns for publishers id
     * @param {string} publisher_id
     * @yield {array} array of campaigns object
     */
    campaignsListModel : async function (publisher_id) {
        console.time("campaignsListModel");
        var blackList = await campaignsModel.getPublisherBlackList(publisher_id);

        return new Promise(function (resolve, reject) {
            global.ESDB.search({
                index : 'logstash',
                type: 'Refresher_publisher',
                q : 'publisher_id:' + publisher_id,
                sort : "@timestamp:desc",
                _source: ["campaigns"],
                size: 1

            }, function(err, response, status){
                if(err) reject(err);
                if(response.hits.total == 0) return resolve([]);
                resolve(
                    { id : blackList.hasOwnProperty("id") ? blackList["id"] : '',
                      c  : response.hits.hits[0]._source.campaigns.map(function(c) {
                               return {
                                  ci: c.campaign_id,
                                  cn: c.campaign_name,
                                  s: blackList.hasOwnProperty("c") && blackList["c"].indexOf(parseInt(c.campaign_id)) > -1 ? true : false
                               }
                           })
                    }
                )
                console.timeEnd("campaignsListModel");
            });
        });
    },

    /**
     * fetch publisher black list if exist
     * @param  {string} publisher_id
     * @return {object}
     */
    getPublisherBlackList : function (publisher_id) {
        return new Promise(function (resolve, reject) {
            global.ESDB.search({
               index : 'publishers_blacklist',
               type : 'publisher_campaign_blacklist',
               q : 'publisher_id:' + publisher_id,
               _source: ["campaigns"],
               size: 1
            }, function(err, response, status){
                if(err) reject(err);
                if(response.hits.total == 0) return resolve([]);

                resolve({ id: response.hits.hits[0]["_id"], c: response.hits.hits[0]._source.campaigns });
            })
        })
    },

    /**
     * create or edit publisher black list
     * @param {object} postParams
     * @param {string} user
     * @yield {object} results
     */
    savePublisherBlacklist : function (postParams, user) {
        return new Promise(function (resolve, reject) {
            var now = new Date();

            var logMsg = 'User ' + user  + (postParams.hasOwnProperty("id") ? " Edit" : " Create") + ' Blacklist for publisher ' + postParams.pi + ' Campaigns: ' + postParams.c,
                ChangeLog = {
                   created :  moment(now).format(DATE_ES_FORMAT),
                   type: "campaigns",
                   user_log : user,
                   message : logMsg
                },
                BlacklistStructure = {
                    index: 'publishers_blacklist',
                    type: 'publisher_campaign_blacklist',
                    body: {}
            };

            if(postParams.hasOwnProperty("id")) {
               BlacklistStructure["id"] = postParams["id"];
               BlacklistStructure["body"] = { doc : {
                    campaigns: postParams.c.map(function(c){
                              return parseInt(c);
                    })
                  }
               }
               global.ESDB.update(BlacklistStructure, function (error, response) {
                  if(error) reject(error);

                  if(response["_shards"]["successful"]) require('../helpers/Utils').createChangeLogMsg(ChangeLog);
                  resolve({ id: response["_id"], created: response["_shards"]["successful"] })
               });
            }else{
               BlacklistStructure["body"] = {
                  created_date: moment(now).format(DATE_ES_FORMAT),
                  publisher_id: postParams.pi,
                  campaigns: postParams.c.map(function(c){
                      return parseInt(c);
                  })
               };
               global.ESDB.create(BlacklistStructure
               , function (error, response){
                  if(error) reject(error);
                  if(response["created"]) require('../helpers/Utils').createChangeLogMsg(ChangeLog);
                  resolve({ id: response["_id"], created: response["created"] })
               });
            }
        });
    }
}

module.exports = campaignsModel;
