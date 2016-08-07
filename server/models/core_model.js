'use strict';

var core_model = {

   alarmsPublishersListModel : function () {
       return new Promise(function (resolve, reject) {
            global.ESDB.search({
                index : 'logstash',
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
    }
}

module.exports = core_model
