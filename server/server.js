//Dependencies
var models = require('./models/models');
var mongoose = require('mongoose');
var http = require('http');
var url = require('url');

//Setup and local variables
var dbName = 'VPU7Schedule',
    dbLink = 'mongodb://localhost/' + dbName,
    header = 'application/json; charset=utf-8';

if(mongoose.connection.readyState == 1){
    startServer();
}else{
    mongoose.connect(dbLink);
    mongoose.connection.once('open', startServer);
}

function startServer() {
    http.createServer(function(req, res){
        var parsedUrl = url.parse(req.url, true),
            link = parsedUrl.pathname,
            data = parsedUrl.query;

        data.method = req.method;
        res.setHeader('Content-Type', header);

        switch (link){
            case '/get_groups':
                models.Group.find({}, function (err, result) {
                    res.statusCode = 200;
                    res.end(JSON.stringify(result));
                });
                break;
            case '/get_teachers':
                models.Teacher.find({}, function (err, result) {
                    res.statusCode = 200;
                    res.end(JSON.stringify(result));
                });
                break;
            case '/get_schedule':
                models.Lesson.find({group: data.name}, function (err, result) {
                    res.statusCode = 200;
                    res.end(JSON.stringify(result));
                });
                break;
            default:
                res.statusCode = 404;
                res.end('Service not found.');
        }
    }).listen(3000);
}








