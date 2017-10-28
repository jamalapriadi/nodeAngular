var mongoose=require('mongoose'),
Schema = mongoose.Schema,
relationship = require('mongoose-relationship');
var UserSchema=require('../models/Account');

var PerusahaanSchema=new mongoose.Schema({
    nama_perusahaan:String,
	informasi_perusahaan:String,
    why_join_us:String,
    user:{
        type:Schema.Types.ObjectId,
        ref:UserSchema
    },
    gambaran_perusahaan:[
        {
            name_info:String,
            value_info:String
        }
    ],
    foto_perusahaan:[
        {
            foto:String
        }
    ],
	created_at:Date,
	updated_at:Date
});

module.exports=mongoose.model('Perusahaan',PerusahaanSchema);