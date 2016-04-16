//Dependencies
var pageGrabber = require('./services/spider/spider');
//var db = require('./services/mongodb');


pageGrabber.on('got-links', function (result) {
    console.log('Done parse link');
    pageGrabber.getLessons(result.groups);
});


pageGrabber.getScheduleLinks();
