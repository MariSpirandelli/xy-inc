var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Client = require('../models/Client.js');

// setting native promise
mongoose.Promise = global.Promise;

/* GET /client listing. */
router.get('/', function(req, res, next) {
	console.log('listing clients');
	//console.log(db);
    Client.find(function (err, clients) {
    if (err){
    	console.log("err");
     return next(err);
 	}
    console.log("Clients : " + clients);
    res.json(clients);
  });
    console.log('passei');
});

module.exports = router;