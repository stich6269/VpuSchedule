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
    this.debugMode = false;
    this.native = mongoose.connection;
    this.collections = [];
    this.initialize();
}

//Initialize module
DatabaseDriver.prototype.initialize = function () {
    var self = this;

    EventEmitter.call(this);
    mongoose.connect(this.dbLink);
    mongoose.set('debug', this.debugMode);
    
    this.native.once('open', function () {
        self.dropCollections()
    })
};

//Drop collections
DatabaseDriver.prototype.dropCollections = function (cb) {
    var self = this;
    
    self.collections = Object.keys(self.native.collections);
    if(self.collections.length){
        async.eachSeries(self.collections, function (item, callback) {
            self.native.collections[item].drop(callback);
        }, function () {
            typeof cb == 'function' && cb()
        });
    }
};

//Save collection
DatabaseDriver.prototype.saveCollection = function (data, cb) {
    if(data.length){
        async.eachSeries(data, function (item, callback) {
            item.save(callback)
        }, function () {
            console.log('saved');
            typeof cb == 'function' && cb()
        });
    }
};


//Exports
module.exports = new DatabaseDriver();