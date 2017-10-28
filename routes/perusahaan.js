var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Perusahaan = require('../models/Perusahaan');

/* get */
router.get('/',function(req,res,next){
    Perusahaan.find(function(err,bid){
        if(err) return next(err);

        res.json(bid);
    });
});

/* post */
router.post('/',function(req,res,next){
    // res.json(
    //     {
    //         'nama':req.body.nama_perusahaan,
    //         'informasi':req.body.informasi_perusahaan,
    //         'why':req.body.why_join_us
    //     }
    // )
    Perusahaan.create(req.body,function(err,post){
        if(err) return next(err);

        //res.json(post);
        res.json(
            {
                'success':true,
                'pesan':'Data Berhasil disimpan'
            }
        );
    });
});

/* show by id */
router.get('/:id',function(req,res,next){
    Perusahaan.findById(req.params.id,function(err,post){
        if(err) return next(err);

        res.json(post);
    });
});

/* update data */
router.put('/:id',function(req,res,next){
    Perusahaan.findByIdAndUpdate(req.params.id,req.body,function(err,post){
        if(err) return next(err);

        //res.json(post);
        res.json(
            {
                'success':true,
                'pesan':'Data Berhasil diupdate',
                'post':post
            }
        );
    });
});

/* hapus data */
router.delete('/:id',function(req,res,next){
    Perusahaan.findByIdAndRemove(req.params.id,req.body,function(err,post){
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