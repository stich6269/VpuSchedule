//Dependencies
var mongoose = require('mongoose');
var db = mongoose.connection.db;

//DB connect
mongoose.connect('mongodb://localhost/test');

//Drop database
db.on('open', function () {
    db.dropDatabase(function (err) {
        if(errr) throw err;
        console.log('Drop database: OK');
    });

    mongoose.disconnect();
});


//Exports
module.exports = mongoose;

