var siteUrl = 'http://www.model.poltava.ua/index.php?option=com_contact&view=contact&id=1&Itemid=220',
    Crawler = require("crawler"),
    http = require('http'),
    parser = require('./services/parser'),
    _ = require('underscore'),
    deferred = require('deferred'),
    Entities =  require('html-entities').AllHtmlEntities,
    entities = new Entities(),
    db = require('./services/mongodb');


var getGroups = new Crawler({
    maxConnections : 1,
    callback : function (error, result, $) {
        var def = parser.getGroups($);
        console.log('End ger group arr...');
        def.done(function (result) {
            console.log('Start get schedule...');
            
       
                for (var i = 0; i < result.length; i++) {
                    var obj = result[i].save();
                }
            
            getSchedule(result);
        })
    }
});

console.log('Start ger group arr...');
getGroups.queue(siteUrl);


function getSchedule(lessonsCollection) {
    var linkArr = _.pluck(lessonsCollection, 'link');
    var counter = 0;
    var getGroups = new Crawler({
        maxConnections : 1,
        callback : function (error, result, $) {
            console.log('End ger group arr...');
            console.log('Start get schedule...');

            var groupName = lessonsCollection[counter].name,
                model = parser.getGroupSchedule($, groupName);
            
                model.save(function (err, model) {
                    console.log('schedule saved to db...');
                })
        }
    });


    getGroups.queue(linkArr[0]);
}
