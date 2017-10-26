var mongoose=require('mongoose'),
Schema = mongoose.Schema,
relationship = require('mongoose-relationship');

var BidangpekerjaanSchema=new mongoose.Schema({
    bidang_pekerjaan_name:String
});

module.exports=mongoose.model('Bidangpekerjaan',BidangpekerjaanSchema);