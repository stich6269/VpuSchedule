//Dependencies
var pageGrabber = require('./services/spider/spider');
var db = require('./services/mongodb/mongodb');


pageGrabber.on('got-links', function (result) {
    console.log('Done parse link');
    db.dropCollections();
    //pageGrabber.getLessons(result.groups);
});

db.on('db:initialized', function () {
    console.log('db ready')
});




pageGrabber.getScheduleLinks();
