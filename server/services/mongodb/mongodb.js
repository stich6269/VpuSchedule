//Dependencies
var mongoose = require('mongoose');
var util = require("util");
var EventEmitter = require("events").EventEmitter;
var async = require("async");
var _ = require("underscore");

mongoose.set('debug', true);
//DB update data constructor with EE
util.inherits(ManageSchedule, EventEmitter);
function ManageSchedule() {
    this.dbLink = 'mongodb://localhost/vpu7';
    this.processData = null;

    EventEmitter.call(this);

    this.dropDatabase();

}

ManageSchedule.prototype.dropDatabase = function () {
    mongoose.connect(this.dbLink);
    mongoose.connection.on('connected', function () {
        var db = mongoose.connection.db;
        db.dropDatabase(function () {
            mongoose.disconnect();
        })
    });
};

ManageSchedule.prototype.saveCollection = function (data) {
    if(_.isArray(data)){
        async.eachSeries(data, function (item, callback) {
            console.log(item);
            item.save(callback)
        }, function (err, result) {
            console.log(result);
        });
    }
};


//Exports
module.exports = new ManageSchedule();

