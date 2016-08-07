'use strict';

var moment = require('moment');

var LogsModel = {

    logsListModel : function (end, start) {
       return new Promise(function (resolve, reject) {
            global.ESDB.search({
               index : 'change_log',
               type : "message",
               sort : "created:desc",
               size : 50,
               body : {
                 query : {
                    range : {
                      created: {
                        "lte": end,
                        "gte": start
                      }
                    }
                 }
               }
            }, function(err, response, status){
                if(err) return reject(err);
                console.log(response);
                if(response.hits.total == 0) return resolve({list: [], types: []});

                var types = []
                var logsArr = response.hits.hits.map(function(log) {
                    if(types.indexOf(log["_source"]["type"]) == -1) types.push(log["_source"]["type"]);
                    return {
                        id: log["_id"],
                        created : moment(log["_source"].created).format('YYYY MM DD, HH:mm'),
                        user_log : log["_source"].user_log,
                        type : log["_source"]["type"],
                        message : log["_source"].message
                    }
                });
                resolve({ list: logsArr, types : types });
            })
       });
    }
}

module.exports = LogsModel;
