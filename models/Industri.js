var mongoose=require('mongoose'),
Schema = mongoose.Schema,
relationship = require('mongoose-relationship');

var IndustriSchema=new mongoose.Schema({
    industri_name:String
});

module.exports=mongoose.model('Industri',IndustriSchema);