var mongoose=require('mongoose'),
Schema = mongoose.Schema,
relationship = require('mongoose-relationship');

var CategorySchema=new mongoose.Schema({
    category_name:String
});

module.exports=mongoose.model('Category',CategorySchema);