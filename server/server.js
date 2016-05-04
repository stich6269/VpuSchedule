var getSchedule = require('./services/get_schedule'),
    models = require('./models/models'),
    mongoose = require('mongoose'),
    async = require("async");
    http = require('http');

//getSchedule.start();


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











