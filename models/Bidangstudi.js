var mongoose=require('mongoose'),
Schema = mongoose.Schema,
relationship = require('mongoose-relationship');

var BidangstudiSchema=new mongoose.Schema({
    bidang_studi_name:String
});

module.exports=mongoose.model('Bidangstudi',BidangstudiSchema);