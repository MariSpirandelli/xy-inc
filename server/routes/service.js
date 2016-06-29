var express = require('express');
var router = express.Router();
var op = require("../db/dbOperations.js");
var ObjectId = require('mongodb').ObjectID;

/**************************************
 * GET /services/:model
 * LIST ALL CONTENT OF A SPECIF MODEL
 **************************************/
 router.get('/:model', function(req, res, next) {
     var client_id = "576aefb195facb98263b8a4e"; //supposed to be caught from token
     //verfy if there is or not a model parameter
     if (!req.params.model) {
         res.status(500).end();
         var err = new Error('No model declared.');
         err.status = 500;
         next(err);
     }

     var modelName = req.params.model + "_" + client_id;
     //connect to database and execute command findAll
     op.findAll(modelName).then(function (err) {
         next(err)
     }, function (result) {
         res.json(result);
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
    
    var modelName = req.params.model + "_" + client_id;
    try {
        var id = new ObjectId(req.params.id);
        //connect to database and execute command findById
        op.findById(modelName,id).then(function (err) {
            next(err)
        }, function (result) {
            res.json(result);
        });

    }catch(err){
        next(err);
    }
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

     var modelName = req.params.model + "_" + client_id;
     //connect to database and execute command save
     op.saveOne(modelName, req.body).then(function (err) {
         next(err)
     }, function (result) {
         res.json(result);
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
    
    var modelName = req.params.model + "_" + client_id;
    try {
        var id = new ObjectId(req.params.id);
        //connect to database and execute command updateById
        op.updateOne(modelName, id, req.body).then(function (err) {
            next(err)
        }, function (result) {
            res.json(result);
        });
    }catch (err){
        next(err);
    }
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
    var modelName = req.params.model + "_" + client_id;
    try {
        var id = new ObjectId(req.params.id);
        //connect to database and execute command deleteById
        op.deleteOne(modelName, id).then(function (err) {
            next(err)
        }, function (result) {
            res.json(result);
        });
    }catch (err){
        next(err);
    }
});

module.exports = router;