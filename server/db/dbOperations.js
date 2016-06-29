var assert = require('assert');
var database = require("../db/dbConnection.js");
var exports = module.exports = {};

//connect to database and execute command FindAll
exports.findAll = function (modelName) {
    return new Promise(function (reject, resolve) {
        database.executeQuery(function (db) {
            var result = [];
            var cursor = db.collection(modelName).find();
            cursor.each(function (err, doc) {
                if (err) {
                    reject(err);
                }
                if (doc != null) {
                    result.push(doc);
                    console.log(doc);
                } else {
                    db.close();
                    resolve(result);
                }
            });
        });
    });
}

//connect to database and execute command FindByID
exports.findById = function (modelName, id) {
    return new Promise(function (reject, resolve) {
        database.executeQuery(function (db) {
            db.collection(modelName).findOne({"_id": id}, function (err, doc) {
                if (err) {
                    reject(err);
                }
                db.close();
                resolve(doc);
            });
        });
    });
}

//connect to database and execute command save
exports.saveOne = function (modelName, content) {
    return new Promise(function (reject, resolve) {
        database.executeQuery(function (db) {
            var result;
            db.collection(modelName).insertOne(content, function (err, succ) {
                if (err) {
                    reject(err);
                }
                console.log(succ.ops[0]);
                console.log("Inserted a document into the" + modelName + "collection.");
                db.close();
                resolve(succ.ops[0]);
            });
        });
    });
}

//connect to database and execute command UpdateById
exports.updateOne = function (modelName, id, fields) {
    return new Promise(function (reject, resolve) {
        database.executeQuery(function (db) {
            db.collection(modelName).updateOne(
                {"_id": id},
                {
                    $set: fields,
                }, function (err, succ) {
                    if (err) {
                        reject(err);
                    }
                    console.log("Updated " + fields + " to id: " + id + " at " + modelName + "collection.");
                    db.close();
                    resolve(succ);
                });
        });
    });
}

//connect to database and execute command DeleteById
exports.deleteOne = function (modelName, id) {
    return new Promise(function (reject, resolve) {
        database.executeQuery(function (db) {
            db.collection(modelName).deleteOne({"_id": id}, function (err, results) {
                if (err) {
                    reject(err);
                }
                console.log("Deleted doc id: " + id + " at " + modelName + "collection.");
                db.close();
                resolve(results);
            });
        });
    });
}