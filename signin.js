var fs = require('fs');
var ejs = require('ejs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var config = require('./config');






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

app.response.msgbox=function(msg,ismoble){
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


app.use('/admin',require('./admin/router-admin'));
app.use('/',function(req,res,next){
  //直接转向后台无
  res.redirect('/admin');
});



app.listen(3001);
console.log('signinapp  stated on port 3001');