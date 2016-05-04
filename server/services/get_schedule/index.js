//Dependencies
var pageGrabber = require('./crawler'),
    mongoose = require('mongoose'),
    util = require("util"),
    async = require("async");


module.exports.start = function () {
    console.log('Parser start...');
    //DB variables
    var dbName = 'VPU7Schedule',
        dbLink = 'mongodb://localhost/' + dbName,
        native = mongoose.connection,
        collections = [];

    mongoose.connect(dbLink);
    native.once('open', function () {
        console.log('db connected...');
        
        collections = Object.keys(native.collections);
        if(collections.length){
            async.eachSeries(collections, function (item, callback) {
                native.collections[item].drop(callback);
            }, function (err) {
                console.log('collections dropped...');
                pageGrabber.getScheduleLinks();
            });
        }
    });

    pageGrabber.once('got-links', function (result) {
        saveModelsTpDb(result.teachers);
        saveModelsTpDb(result.groups);
    });

    function saveModelsTpDb(models){
        async.eachSeries(models, function (item, callback) {
            item.save(callback);
        }, function (err) {
            console.log('collections saved...');
        });
    }
};