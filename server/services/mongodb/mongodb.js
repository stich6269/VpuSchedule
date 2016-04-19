//Dependencies
var mongoose = require('mongoose');
var util = require("util");
var EventEmitter = require("events").EventEmitter;
var async = require("async");

mongoose.set('debug', true);
//DB update data constructor with EE
util.inherits(ManageSchedule, EventEmitter);
function ManageSchedule() {
    this.dbLink = 'mongodb://localhost/vpu7';
    this.processData = null;

    EventEmitter.call(this);
    mongoose.connect(this.dbLink);
    //this.dropDatabase();
}


ManageSchedule.prototype.connect = function (callback) {
    mongoose.connection.on('connected', callback)
};

ManageSchedule.prototype.clearDb = function (callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback)
};

ManageSchedule.prototype.disconnect = function (callback) {
    mongoose.disconnect(callback);
};

ManageSchedule.prototype.save = function () {
    console.log('save collection ', this.processData.length);
    var self = this;
    async.eachSeries(self.processData, function (item, callback) {
        item.save(callback)
    }, function (err, result) {
        self.processData = null;
        console.log(result);
    });
};


ManageSchedule.prototype.dropDatabase = function () {
    async.series([
        this.connect,
        this.clearDb,
        this.disconnect
    ], function (err) {
        if (err) throw err;
    })
};


ManageSchedule.prototype.saveCollection = function (data) {
    this.processData = data;
    async.series([
        this.connect,
        this.save,
        this.disconnect
    ], function (err, result) {
        if (err) throw err;
        console.log(result);
    })
};


//Exports
module.exports = new ManageSchedule();

