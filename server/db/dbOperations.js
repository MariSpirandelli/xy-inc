var MongoClient = require('mongodb').MongoClient;
var uri = require("../config.js").connectionUri();

var exports = module.exports = {};

exports.findAll = function (modelName) {
    return MongoClient.connect(uri, function (err, db) {
        if (err) {
            reject(err);
        } else {
            var result = [];
            var cursor = db.collection(modelName).find();
            cursor.each(function (err, doc) {
                assert.equal(err, null);
                if (doc != null) {
                    result.push(doc);
                    console.log(doc);
                } else {
                    db.close();
                }
            });
            return result;
        }
    });
}

exports.findById = function (modelName, id) {
    MongoClient.connect(uri, function(err, db) {
        if(err) {
            res.status(500).end();
            next(err);
        } else {
            var result = db.collection(modelName).find({_id:id});
            db.close();
            return result[0];
        }
    });
}

exports.saveOne = function (modelName, content) {
    MongoClient.connect(uri, function(err, db) {
        if(err) {
            res.status(500).end();
            next(err);
        } else {
            var result;
            db.collection(modelName).insertOne( content, function(err, succ) {
                assert.equal(err, null);
                console.log(succ.ops[0]);
                console.log("Inserted a document into the" +  modelName + "collection.");
                db.close();
                result = succ.ops[0];
            });

            return result;
        }
    });
}