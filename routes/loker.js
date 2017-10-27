var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Loker = require('../models/Loker');

/* get */
router.get('/',function(req,res,next){
    Loker.find(function(err,bid){
        if(err) return next(err);

        res.json(bid);
    });
});

module.exports=router;