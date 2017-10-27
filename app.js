var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var index = require('./routes/index');
var users = require('./routes/account');
var config = require('./config');
var bidangpekerjaan = require('./routes/bidangpekerjaan');
var bidangstudi = require('./routes/bidangstudi');
var industri = require('./routes/industri');
var category = require('./routes/category');
var authenticate = require('./routes/authenticate');
var Account = require('./models/Account');

var app = express();

mongoose.Promise=global.Promise;
app.secret="ilovetelkomdds";
//koneksi database
mongoose.connect(config.database)
.then(()=>console.log('Berhasil terhubung dengan MongoDB'))
.catch((err)=>console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('telkomSecret',config.secret);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);


/* api */
var apiRoutes = express.Router();
apiRoutes.get('/',function(req,res){
  res.json({message:'Welcome to my api'});
});

/* route authentikate disini */
apiRoutes.post('/authenticate', function(req, res) {
  
  // find the user
  Account.findOne({
    email: req.body.email
  }, function(err, user) {
    
    if (err) throw err;
    
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      
      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        
        // if user is found and password is right
        // create a token with only our given payload
        // we don't want to pass in the entire user since that has the password
        const payload = {
          admin: user.type_user 
        };
        var token = jwt.sign(payload, app.get('telkomSecret'), {
          expiresIn : 60*60*24 // expires in 24 hours
        });
        
        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          type_user:user.type_user,
          token: token
        });
      }   
      
    }
    
  });
});


apiRoutes.use(function(req,res,next){
  var token=req.body.token || req.query.token || req.headers['x-access-token'];
  
  if(token){
    //verifi secret and check exp
    jwt.verify(token, app.get('telkomSecret'),function(err,decoded){
      if(err){
        return res.json({success:false,message:'Failed to authenticate token'});
      }else{
        //if everything is good, save to request for use in other route
        req.decoded=decoded;
        next();
      }
    });
  }else{
    //if there is no token
    //return an error
    return res.status(403).send({
      success:false,
      message:'No token provided.'
    });
  }
});

/* untuk router yang terautentikasi */
apiRoutes.use('/bidang-pekerjaan',bidangpekerjaan);
apiRoutes.use('/bidang-studi',bidangstudi);
apiRoutes.use('/industri',industri);
apiRoutes.use('/category',category);
apiRoutes.use('/account',users);

app.use('/api',apiRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
