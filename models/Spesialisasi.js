var mongoose=require('mongoose'),
Schema = mongoose.Schema,
relationship = require('mongoose-relationship');
var Category = require('../models/Category');

var SpesialisasiSchema=new mongoose.Schema({
    spesialisasi_name:String,
    category:{
        type:Schema.Types.ObjectId,
        ref:Category
    }  
});

module.exports=mongoose.model('Spesialisasi',SpesialisasiSchema);