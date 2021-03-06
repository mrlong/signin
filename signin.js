var fs = require('fs');
var ejs = require('ejs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var config = require('./config');
var wechat=require('wechat');
var multer  = require('multer');  //上传组件
var Db = require('./lib/db');


var app = express();
module.exports = app;

  
app.response.loadview=function(filename,params,ismoble){
  var myismoble;
  var myparams = {};
  var viewstyle = this.viewstyle || 'home';
      
  if(typeof params ==='boolean'){
      myismoble = params;
  }
  else{
    myparams = params;
    myismoble = ismoble || false; 
  };

  if (myismoble == false){
    this.render('./' + viewstyle + '/view/'  + filename,myparams); 
  }
  else{
    this.render('./moblie/view/' + filename,myparams);   
  }
};

app.response.msgBox=function(msg,ismoble){
  var myismoble;
  var viewstyle = this.viewstyle || 'home';
  
  myismoble = ismoble || false; 

  if (myismoble == false){
    this.render('./' + viewstyle + '/view/msgbox.html',{msg:msg}); 
  }
  else{
    this.render('./moblie/view/msgbox.html' ,{msg:msg});   
  }
};


app.use(bodyParser());
app.use(express.static(__dirname + '/public',{ maxAge: 86400000 }));
app.use(express.static(__dirname + '/upload'));

app.set('views', path.join(__dirname, './'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.set('view cache', false);


app.use(cookieParser());
app.use(session({
  name:'signinapp',
  secret: '7895123', 
  key: 'signinapp', 
  cookie: { secure: false,maxAge: 1000 * 60 * 60 * 24 * 1 }  //1天保存
}));


//app.use(cookieParser());
//app.use(session({
//  secret: '7895123', 
//  resave: false,
//  saveUninitialized: true,
//  //cookie: { secure: false,maxAge: 1000 * 60 * 60 * 24} //1 hour保存 
//}));



app.use(multer({
  dest: './upload',
  rename: function (fieldname, filename) {
    return Db.newGuid();
  }
}));



app.use('/admin',require('./admin/router-admin'));
app.use('/m',require('./moblie/router-moblie'));

//微信
app.use('/wechat',wechat(config.wechat.token,function (req, res, next){
  console.log(req.sessionID+'--login22');
  console.log(req);
  next(); 
}),require('./wechat'));
require('./wechat/menu').createmenu();

app.use('/',function(req,res,next){
  //直接转向后台无
  res.redirect('/admin');
});

//导常处理方案
///app.error(function(err, req, res, next){                                             
//  mailServie.sendMail({                                                     
//    subject : "FixedAssetManager_Server[App Error]",                    
//    text    : err.message + "\n" + err.stack + "\n" + err.toString()            
//  });                                                                       
//  if (err instanceof PageNotFoundError) {                               
//      res.render("errors/404");                                             
//  } else if (err instanceof ServerError) {                                      
//      res.render("errors/500");                                             
//  }                                                                         
//}); 

process.on("uncaughtException", function (err) {                                      
//  mailServie.sendMail({                                                     
//      subject : "FixedAssetManager_Server[App Error]",                      
//      text    : err.message + "\n" + err.stack + "\n" + err.toString()          
//  });                                                                       
});   


app.listen(3001);
console.log('signinapp  stated on port 3001');






