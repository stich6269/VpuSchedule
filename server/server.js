//Dependencies
var pageGrabber = require('./services/spider/spider');
var db = require('./services/mongodb/mongodb');
var async = require("async");

/*
db.dropCollections(function () {
    console.log('Collection dropped');
    pageGrabber.once('got-links', function (result) {
        db.saveCollection(result.teachers, function () {
            db.saveCollection(result.groups, function () {
                console.log('Collections saved');
                //pageGrabber.getLessons(result.groups);
            })
        });
    });


    pageGrabber.getScheduleLinks();
});
*/

db.once('db:connected', function () {
    console.log('connected');
    async.series([],
    function (result) {
        console.log('')
    })
});

