var express = require('express');
var router = express.Router();
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var uri = require("../config.js").connectionUri();
var ObjectId = require('mongodb').ObjectID;

/**************************************
 * GET /services/:model
 * LIST ALL CONTENT OF A SPECIF MODEL
 **************************************/
 router.get('/:model', function(req, res, next) {
     var client_id = "576aefb195facb98263b8a4e"; //supposed to be caught from token
    //verfy if there is or not a model parameter
     if(!req.params.model){
         res.status(500).end();
         var err = new Error('No model declared.');
         err.status = 500;
         next(err);
     }

     var modelName = req.params.model + "_" + client_id;
     //connect to database
     MongoClient.connect(uri, function(err, db) {
         if(err) {
             res.status(500).end();
             next(err);
         } else {
             var result = [];
             //find all
             var cursor = db.collection(modelName).find();
             cursor.each(function (err, doc) {
                 assert.equal(err, null);
                 if (doc != null) {
                     result.push(doc);
                     console.log(doc);
                 } else {
                     db.close();
                     res.json(result);
                 }
             });
         }
     });
 });

/**************************************
 * GET /services/:model/:id
 * SEARCH BY ID A CONTENT OF A SPECIF MODEL
 **************************************/
router.get('/:model/:id', function(req, res, next) {
    var client_id = "576aefb195facb98263b8a4e"; //supposed to be caught from token
    if(!req.params.model || !req.params.id){
        res.status(500).end();
        var err = new Error('Either model or id not declared');
        err.status = 500;
        next(err);
    }
    //connect to database
    MongoClient.connect(uri, function(err, db) {
        if(err) {
            res.status(500).end();
            next(err);
        } else {
            var modelName = req.params.model + "_" + client_id;
            try {
                var id = new ObjectId(req.params.id);
                db.collection(modelName).findOne({"_id": id}, function (err, doc) {
                    assert.equal(err, null);
                    db.close();
                    res.json(doc);
                });
            }catch(err){
                next(err);
            }
        }
    });
});


/**************************************
 * POST /services/:model
 * INSERT A CONTENT INTO A SPECIF MODEL
 **************************************/
 router.post('/:model', function(req, res, next) {
     var client_id = "576aefb195facb98263b8a4e"; //supposed to be caught from token
     if(!req.params.model){
         res.status(500).end();
         var err = new Error('No model declared.');
         err.status = 500;
         next(err);
     }

     if(!req.body) {
         res.status(500).end();
         var err = new Error('No content to be saved');
         err.status = 500;
         next(err);
     }
     //connect to database
     MongoClient.connect(uri, function(err, db) {
         if(err) {
             res.status(500).end();
             next(err);
         } else {
             var modelName = req.params.model + "_" + client_id;
             db.collection(modelName).insertOne( req.body, function(err, succ) {
                 assert.equal(err, null);
                 console.log(succ.ops[0]);
                 console.log("Inserted a document into the" +  modelName + "collection.");
                 db.close();
                 res.json(succ.ops[0]);
             });
         }
     });
});

/**************************************
 * PUT /services/:model/:id
 * UPDATE A CONTENT BY ID FROM A SPECIF MODEL
 **************************************/
router.put('/:model/:id', function(req, res, next) {
    var client_id = "576aefb195facb98263b8a4e"; //supposed to be caught from token
    if(!req.params.model || !req.params.id){
        res.status(500).end();
        var err = new Error('Either model or id not declared');
        err.status = 500;
        next(err);
    }
    if(!req.body) {
        res.status(500).end();
        var err = new Error('No content to be updated');
        err.status = 500;
        next(err);
    }
    //connect to database
    MongoClient.connect(uri, function(err, db) {
        if(err) {
            res.status(500).end();
            next(err);
        } else {
            var modelName = req.params.model + "_" + client_id;
            try {
                var id = new ObjectId(req.params.id);
                db.collection(modelName).updateOne(
                    {"_id": id},
                    {
                        $set: req.body,
                    }, function (err, succ) {
                        assert.equal(err, null);
                        console.log("Updated " + req.body + " to id: " + id + " at " + modelName + "collection.");
                        db.close();
                        res.json(succ);
                    });
            }catch (err){
                next(err);
            }
        }
    });
});

/**************************************
 * DELETE /services/:model/:id
 * DELETE A CONTENT BY ID FROM A SPECIF MODEL
 **************************************/
router.delete('/:model/:id', function(req, res, next) {
    var client_id = "576aefb195facb98263b8a4e"; //supposed to be caught from token
    if(!req.params.model || !req.params.id){
        res.status(500).end();
        var err = new Error('Either model or id not declared');
        err.status = 500;
        next(err);
    }

    //connect to database
    MongoClient.connect(uri, function(err, db) {
        if(err) {
            res.status(500).end();
            next(err);
        } else {
            var modelName = req.params.model + "_" + client_id;
            try {
                var id = new ObjectId(req.params.id);
                db.collection(modelName).deleteOne({"_id": id}, function (err, results) {
                    assert.equal(err, null);
                    console.log("Deleted doc id: " + id + " at " + modelName + "collection.");
                    db.close();
                    res.json(results);
                });
            }catch (err){
                next(err);
            }
        }
    });
});

module.exports = router;
