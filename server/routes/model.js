var express = require('express');
var router = express.Router();
var ClientModel = require('../models/ClientModel.js');
var op = require("../db/dbOperations.js");

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
    //connect to database and execute command save
    op.saveOne(ClientModel.modelName, {
        client_id: client_id,
        model_name: bodyReq.model_name + "_" + client_id,
        model_attributes: bodyReq.model_attributes,
        updated_at: Date.now()
    }).then(function (err) {
        next(err)
    }, function (result) {
        res.json(result);
    });
});

module.exports = router;