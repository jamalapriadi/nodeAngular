var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Account = require('../models/Account');

/* get */
router.get('/',function(req,res,next){
    Account.find(function(err,bid){
        if(err) return next(err);

        res.json(bid);
    });
});

/* post */
router.post('/',function(req,res,next){
    Account.create(req.body,function(err,post){
        if(err) return next(err);

        res.json(post);
    });
});

router.post('/register',function(req,res,next){
    var user=new Account(
        {
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email:req.body.email,
            password:req.body.password,
            type_user:'member',
            remember_token:'',
            active:'Y',
            profile:[],
            file:[],
            pendidikan:[],
            pengalaman:[]
        }
    );

    user.save(function (err) {
        if (err) return handleError(err);
        // saved!
        res.json(
            {
                'success':true,
                'pesan':'Data Berhasil disimpan'
            }
        );
    })
})

/* show by id */
router.get('/:id',function(req,res,next){
    Account.findById(req.params.id,function(err,post){
        if(err) return next(err);

        res.json(post);
    });
});

/* update data */
router.put('/:id',function(req,res,next){
    Account.findByIdAndUpdate(req.params.id,req.body,function(err,post){
        if(err) return next(err);

        //res.json(post);
        res.json({'success':true,'pesan':'Data Berhasil diupdate'});
    });
});

/* hapus data */
router.delete('/:id',function(req,res,next){
    Account.findByIdAndRemove(req.params.id,req.body,function(err,post){
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