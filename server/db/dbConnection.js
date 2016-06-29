var MongoClient = require('mongodb').MongoClient;
var uri = require("../config.js").connectionUri();

var exports = module.exports = {};

//connects to the database
exports.executeQuery = function (callback) {
    MongoClient.connect(uri, function(err, db) {
        if(err) {
            res.status(500).end();
            next(err);
        } else {
            callback(db);
        }
    });
}