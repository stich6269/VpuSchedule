//Dependencies
var pageGrabber = require('./services/spider/spider');
var db = require('./services/mongodb/mongodb');

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






