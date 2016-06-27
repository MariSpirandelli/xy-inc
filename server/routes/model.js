var express = require('express');
var router = express.Router();
var ClientModel = require('../models/ClientModel.js');
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var uri = require("../config.js").connectionUri();

/**************************************
 * POST /model 
 * ASSIGN A MODEL TO A SPECIFIC USER
 **************************************/
router.post('/', function(req, res, next) {
    var client_id = "576aefb195facb98263b8a4e"; //supposed to be caught from token
    if(!req.body) {
        res.status(500).end();
        var err = new Error('No content to be saved');
        err.status = 500;
        next(err);
    }
    
    var bodyReq = req.body;
    //connect to database
    MongoClient.connect(uri, function (err, db) {
        if (err) {
            res.status(500).end();
            next(err);
        } else {
            db.collection(ClientModel.modelName).insertOne({
                    client_id: client_id,
                    model_name: bodyReq.model_name + "_" + client_id,
                    model_attributes: bodyReq.model_attributes,
                    updated_at: Date.now()
                },
                function (err, succ) {
                    if (err) return next(err);
                    db.close();
                    console.log(succ.ops[0]);
                    res.json(succ.ops[0]);
                });
        }

    });

});

module.exports = router;