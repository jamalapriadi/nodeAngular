var mongoose=require('mongoose'),
Schema = mongoose.Schema,
relationship = require('mongoose-relationship');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var Bidangstudi = require('../models/Bidangstudi');
var Spesialisasi = require('../models/Spesialisasi');
var Bidangpekerjaan = require('../models/Bidangpekerjaan');
var Industri = require('../models/Industri');

var AccountSchema=new mongoose.Schema({
    first_name:{type:String, required:true},
	last_name:{type:String, required:true},
	username:{type:String,required: true, index: { unique: true }},
	email:{ type:String, required: true},
	password:{ type:String, required: true},
	type_user:['admin','owner', 'member' ],
	remember_token:String,
    active:['Y','N'],
    profile:{
        tanggal_lahir:String,
        no_hp:String,
        alamat:String
    },
    file:[
        {
            name_file:String,
            file:String
        }
    ],
    pendidikan:[
        {
            universitas:String,
            lokasi:String,
            kualifikasi:String,
            bidang_studi:{
                type:Schema.Types.ObjectId,
                ref:Bidangstudi
            },
            tahun_wisuda:Date
        }
    ],
    pengalaman:[
        {
            jenis_pengalaman:['pengalaman','lulusan baru','mahasiswa'],
            mulai_bekerja:Date,
            posisi:String,
            nama_perusahaan:String,
            spesialisasi_id:{
                type:Schema.Types.ObjectId,
                ref:Spesialisasi
            },
            bidang_pekerjaan_id:{
                type:Schema.Types.ObjectId,
                ref:Bidangpekerjaan
            },
            industri_id:{
                type:Schema.Types.ObjectId,
                ref:Industri,
            },
            jabatan:String,
            lama_bekerja_start:Date,
            lama_bekerja_end:Date
        }
    ],
	created_at:{ type : Date, default: Date.now },
	updated_at:{ type : Date, default: Date.now }
});

AccountSchema.pre('save', function(next) {
    var user = this;
    
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
    
    
});

AccountSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports=mongoose.model('Account',AccountSchema);