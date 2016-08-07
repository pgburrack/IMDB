'use strict';

var moment = require('moment'),
    DATE_ES_FORMAT = require("../helpers/ConstUtility")["DATE_ES_FORMAT"];

var Alarms = {

    alarmsListModel : function (user) {
      return new Promise(function (resolve, reject) {
            console.time('alarmsListModel');
            global.ESDB.search({
               index : 'alarms',
               q: 'alert.user_id:' + user,
               size: 100
            }, function(err, response, status){
                if(err) reject(err);
                if(!response || response.hits.total == 0) return resolve([]);

                var alarmsArr = response.hits.hits.map(function(alarm) {
                    return Object.assign({}, { id : alarm["_id"] }, alarm["_source"]);
                });

                console.timeEnd('alarmsListModel');
                resolve(alarmsArr);
            })
       });
    },

    alarmsConfigModel : function () {
         return new Promise(function (resolve, reject) {
            global.ESDB.search({
                index : 'config',
                size: 15
            }, function(err, response, status){
                if(err) reject(err);
                 console.time('alarmsConfigModel');
                var configObj = {};
                response.hits.hits.forEach(function(config){
                    if(!configObj.hasOwnProperty(config["_type"])) configObj[config["_type"]] = [];
                    configObj[config["_type"]].push(Object.assign({}, { id : config["_id"] }, config["_source"]));
                });
                console.timeEnd('alarmsConfigModel');
                resolve(configObj);
            });
        });
    },

    alarmsCampaignListModel : function () {
        return new Promise(function (resolve, reject) {
            global.ESDB.search({
                index : 'logstash-*',
                type: 'Refresher_available_campaign_ids',
                sort : "@timestamp:desc",
                _source: ["campaigns"],
                size: 1

            }, function(err, response, status){
                if(err) reject(err);
                if(response.hits.total == 0) resolve([]);

                resolve(response.hits.hits[0]._source.campaigns);
            });
        });
    },

    alarmSaveModel : async function (alarm, user) {
        var AlarmNewParams = {},
            AlarmEdit = {},
            now = new Date(),
            logMsg = 'User ' + user  + (alarm.hasOwnProperty("id") ? " Edit" : " Create") + ' Alarm ' + alarm.name + ' Conditions: ' + alarm.alarmStrCondition,
            ChangeLog = {
               created :  moment(now).format(DATE_ES_FORMAT),
               type: "alarms",
               user_log : user,
               message : logMsg
            };

        // res[0] = bucketField || res[1] = alertUsers
        let res = await Promise.all([Alarms.createBucketField(alarm["category"]), Alarms.createAlertUserArr(alarm["type"], alarm["users"])]),
            AlarmDoc = await Alarms.createAlarmDoc(alarm, res[1], now);


        return new Promise(function (resolve, reject) {
             var AlarmDocStructure = {
                index: 'alarms',
                type: 'alarm_params'
             };
              if(alarm.hasOwnProperty("id")){
                AlarmDocStructure.id = alarm.id;
                AlarmDocStructure["body"] = { doc : AlarmDoc };
             }else{
                AlarmNewParams.created_by = user;
                AlarmNewParams.created_date = moment(now).format("YYYY-MM-DD HH:mm:ss");
                AlarmDocStructure["body"] = AlarmDoc;
             }
             AlarmDoc = Object.assign(AlarmDoc, AlarmNewParams, res[0]);

             if(alarm.hasOwnProperty("id")){
                global.ESDB.update(AlarmDocStructure, function (error, response) {
                   if(error) reject(error);

                   if(response["_shards"]["successful"]) require('../helpers/Utils').createChangeLogMsg(ChangeLog);
                   resolve({id: response["_id"], created: response["_shards"]["successful"]})
                });
             }else{
                global.ESDB.create(AlarmDocStructure
                , function (error, response){
                    if(error) reject(error);

                    if(response["created"]) require('../helpers/Utils').createChangeLogMsg(ChangeLog);
                    resolve({id: response["_id"], created: response["created"]})
                });
             }
        });
    },

    searchUser : function (q) {
        return new Promise(function (resolve, reject) {
            console.time("fetch user");
            global.ESDB.search({
              index: 'users',
              q: 'user_name:' + q + '*',
              body: {
                _source : "mail"
              }
            }, function (error, response) {
                if(error) reject(error);
                if(response.hits.total == 0) resolve([]);
                var usersMails = response.hits.hits.map(function(res){
                   return res._source.mail;
                });
                console.timeEnd("fetch user");
                resolve(usersMails);
            });
        });

    },

    createAlarmDoc : function(alarm, alertUsers, now) {
       return {
            name : alarm.name.length > 0 ? alarm.name : "Alarm_" + moment(now).format(DATE_ES_FORMAT),
            message : alarm.message,
            category : alarm.category,
            time_period : "now-" + alarm.time_period,
            predicate : alarm.predicate,
            metric : {
                field : alarm.metric,
                type : "sum"
            },
            comparison : {
                operator : alarm.operator,
                constant : alarm.constant
            },
            alert : alertUsers,
            alarm_str_condition : alarm.alarmStrCondition,
            triggered : false,
            last_edited : moment(now).format(DATE_ES_FORMAT),
            enabled : alarm.enabled
        }
    },

    createBucketField : function (category) {
        switch(category){
            case "ca":
              return { bucket_field : "campaign_id" }
              break;
            case "pa":
              return { bucket_field : "publisher_id" }
              break;
            default:
              return {}
        }
    },

    createAlertUserArr : function (type, users) {
       var alertArr = users.map(function(user){
         return {
            user_id : user,
            type : type
         }
       })
      return alertArr;
    },

    alarmsPublishersListModel : function() {
      return new Promise(function (resolve, reject) {
            global.ESDB.search({
                index : 'logstash-*',
                type: 'Refresher_available_publisher_ids',
                sort : "@timestamp:desc",
                _source: ["publishers"],
                size: 1

            }, function(err, response, status){
                if(err) reject(err);
                if(response.hits.total == 0) resolve([]);

                resolve(response.hits.hits[0]._source.publishers);
            });
        });
    },

    alarmsCampaignListModel : function() {
      return new Promise(function (resolve, reject) {
            global.ESDB.search({
                index : 'logstash-*',
                type: 'Refresher_available_campaign_ids',
                sort : "@timestamp:desc",
                _source: ["campaigns"],
                size: 1

            }, function(err, response, status){
                if(err) reject(err);
                if(response.hits.total == 0) resolve([]);

                resolve(response.hits.hits[0]._source.campaigns);
            });
        });
    }
}

module.exports = Alarms;
