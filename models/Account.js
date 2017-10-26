var mongoose=require('mongoose'),
Schema = mongoose.Schema,
relationship = require('mongoose-relationship');
var Bidangstudi = require('../models/Bidangstudi');
var Spesialisasi = require('../models/Spesialisasi');
var Bidangpekerjaan = require('../models/Bidangpekerjaan');
var Industri = require('../models/Industri');

var AccountSchema=new mongoose.Schema({
    first_name:String,
	last_name:String,
	username:String,
	email:String,
	password:String,
	type_user:['admin','owner', 'member' ],
	remember_token:String,
    active:['Y','N'],
    profile:[
        {
            tanggal_lahir:Date,
            no_hp:String,
            alamat:String
        }
    ],
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

module.exports=mongoose.model('Account',AccountSchema);