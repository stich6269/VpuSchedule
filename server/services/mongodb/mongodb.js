//Dependencies
var mongoose = require('mongoose'),
    util = require("util"),
    EventEmitter = require("events").EventEmitter,
    async = require("async");


//DB update data constructor with EE
util.inherits(DatabaseDriver, EventEmitter);
function DatabaseDriver() {
    this.dbName = 'VPU7Schedule';
    this.dbLink = 'mongodb://localhost/' + this.dbName;
    this.debugMode = true;
    this.native = mongoose.connection;
    this.collections = [];
    this.initialize();
}

DatabaseDriver.prototype.initialize = function () {
    var self = this;

    EventEmitter.call(this);
    mongoose.connect(this.dbLink);
    mongoose.set('debug', this.debugMode);

    this.native.on('open', function () {
        self.collections = Object.keys(self.native.collections);

    })

};









DatabaseDriver.prototype.dropCollections = function () {
    var self = this;

    if(this.collections.length){
        async.eachSeries(this.collections, function (item, callback) {
            self.native.collections[item].drop(callback);
        }, function () {
            self.emit('db:initialized');
        });
    }
};










DatabaseDriver.prototype.saveCollection = function (data) {
    if(data.length){
        async.eachSeries(data, function (item, callback) {
            item.save(callback)
        }, function (err, result) {
            console.log(result, 'saved');
        });
    }
};




//Exports
module.exports = new DatabaseDriver();

