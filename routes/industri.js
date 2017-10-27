var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Industri = require('../models/Industri');

/* get */
router.get('/',function(req,res,next){
    Industri.find(function(err,bid){
        if(err) return next(err);

        res.json(bid);
    });
});

/* post */
router.post('/',function(req,res,next){
    Industri.create(req.body,function(err,post){
        if(err) return next(err);

        //res.json(post);
        res.json(
            {
                'success':true,
                'pesan':'Data berhasil disimpan'
            }
        )
    });
});

/* show by id */
router.get('/:id',function(req,res,next){
    Industri.findById(req.params.id,function(err,post){
        if(err) return next(err);

        res.json(post);
    });
});

/* update data */
router.put('/:id',function(req,res,next){
    Industri.findByIdAndUpdate(req.params.id,req.body,function(err,post){
        if(err) return next(err);

        //res.json(post);
        res.json({'success':true,'pesan':'Data Berhasil diupdate'});
    });
});

/* hapus data */
router.delete('/:id',function(req,res,next){
    Industri.findByIdAndRemove(req.params.id,req.body,function(err,post){
        if(err) return next(err);

        res.json(
            {
                'success':true,
                'pesan':'Data Berhasil dihapus'
            }
        );
    });
});

module.exports=router;