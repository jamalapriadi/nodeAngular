var mongoose = require('mongoose');
var User = mongoose.Schema;

module.exports=mongoose.model('User',new Schema({
    first_name:String,
	last_name:String,
	username:String,
	email:String,
	password:String,
	type:['admin','owner', 'member' ],
	remember_token:String,
	active:['Y','N'],
	created_at:{ type : Date, default: Date.now },
	updated_at:{ type : Date, default: Date.now }
}));