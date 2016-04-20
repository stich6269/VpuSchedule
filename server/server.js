//Dependencies
var pageGrabber = require('./services/spider/spider');
var db = require('./services/mongodb/mongodb');


pageGrabber.on('got-links', function (result) {
    console.log('Done parse link');
    //pageGrabber.getLessons(result.groups);
    db.saveCollection(result.groups);
    db.saveCollection(result.teachers);
});

pageGrabber.getScheduleLinks();
