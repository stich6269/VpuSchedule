//Dependencies
var models = require('./models/models');
var mongoose = require('mongoose');
var http = require('http');

//Setup and local variables
var dbName = 'VPU7Schedule',
    dbLink = 'mongodb://localhost/' + dbName,
    native = mongoose.connection;

    mongoose.connect(dbLink);
    native.once('open', function () {
        var server = new http.createServer(function (req, res) {
            if(req.url == '/get_groups'){
                models.Group.find({}, function (err, result) {
                    res.end(JSON.stringify(result));
                })
            }

            if(req.url == '/get_teachers'){
                models.Teacher.find({}, function (err, result) {
                    res.end(JSON.stringify(result));
                })
            }

        }).listen(3000);
    });











