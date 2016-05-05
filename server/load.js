//Dependencies
var pageGrabber = require('./services/get_schedule/crawler');
var mongoose = require('mongoose');
var util = require("util");
var async = require("async");
var models = require('./models/models');


//Setup and local variables
var dbName = 'VPU7Schedule',
    dbLink = 'mongodb://localhost/' + dbName,
    collections = [],
    debug = true;

//Auto run function
(function () {
    debug && console.log('Parser start...');
    
    //Open DB connections
    mongoose.connect(dbLink);

    // If the connection throws an error
    mongoose.connection.on('error',function (err) {
        debug && console.log('Mongoose error: ' + err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
        debug && console.log('Mongoose disconnected...');
    });
    
    //When connected to db
    mongoose.connection.once('connected', function () {
        debug && console.log('DB connected...');
        dropCollections(function () {
            debug && console.log(collections.join(', ') + ' dropped...');
            pageGrabber.getScheduleLinks();
        })
    });
    
    //Get new lists
    pageGrabber.once('got-links', function (result) {
        debug && console.log('Links parsed...');
        saveCollection(result);
    });
    
    //Get new lists
    pageGrabber.once('got-lessons', function (result) {
        debug && console.log('Lessons parsed...');
        saveCollection(result, closeDb);
    });

    //Save collections to db
    function saveCollection(collection, cb){
        async.eachSeries(collection, function (item, callback) {
            item.save(callback);
        }, function () {
            debug && console.log('Saved ' + collection.length + ' items...');
            models.Group.find({}, function (err, result) {
                pageGrabber.getLessons(result);
                typeof cb == 'function' && cb();
            })
        });
    }
    
    //Drop all collections from db
    function dropCollections(cb) {
        collections = Object.keys(mongoose.connection.collections);
        async.eachSeries(collections, function (item, callback) {
            mongoose.connection.collections[item].drop(callback);
        }, cb);
    }
    
    //Close db connections
    function closeDb() {
        mongoose.connection.close(function () {
            process.exit(0);
        });
    }
})();