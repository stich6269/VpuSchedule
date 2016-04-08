var siteUrl = 'http://www.model.poltava.ua/index.php?option=com_contact&view=contact&id=1&Itemid=220',
    Crawler = require("crawler"),
    http = require('http'),
    parser = require('./services/parser/index'),
    _ = require('underscore'),
    deferred = require('deferred'),
    Entities =  require('html-entities').AllHtmlEntities,
    entities = new Entities();



var getGroups = new Crawler({
    maxConnections : 1,
    callback : function (error, result, $) {
        var def = parser.getGroups($);
        console.log('End ger group arr...');
        def.done(function (result) {
            console.log('Start get schedule...');
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
            console.log(lessonsCollection[counter].name);
            parser.getGroupSchedule($);
            counter++;
        }
    });


    getGroups.queue(linkArr[0]);
}
