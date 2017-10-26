var mongoose=require('mongoose'),
Schema = mongoose.Schema,
relationship = require('mongoose-relationship');

var LokerSchema=new mongoose.Schema({
    perusahaan:{
        type:Schema.Types.ObjectId,
        ref:PerusahaanSchema
    },
    divisi:String,
	spesialisasi:{
        type:Schema.Types.ObjectId,
        res:SpesialisasiSchema
    },
	position:String,
	job_deskription:String,
	job_requirement:String,
	job_location:String,
	address:String,
	salary:String,
	min_experience:String,
	start_date:String,
	end_date:String,
	cover:String,
    status:['open','close'],
    tags:[
        {
            tags:String
        }
    ],
    pelamar:[
        {
            type:Schema.Types.ObjectId,
            res:UserSchema,
            desc:String,
            file:[
                {
                    name_file:String
                }
            ]
        }
    ],
	created_at:Date,
	updated_at:Date
})

module.exports=mongoose.model('Loker',LokerSchema);