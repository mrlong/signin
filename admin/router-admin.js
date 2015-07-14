
var express = require('express');
var router = express.Router();

//网站的主页。
router.use(function(req,res,next){
  res.viewstyle = 'admin'; 
  console.log('session=' + req.session.openid);
  
  if(req.sessions.openid || req.originalUrl=='/admin/login'){
    next(); 
  }
  else{
     //next(); 
    req.sessions.openid='6666';
    res.redirect('/admin/login'); 
  }
});

router.use('/import',require('./controller/import'));
router.use('/fans',require('./controller/fans'));
router.use('/user',require('./controller/user'));
router.use('/login',require('./controller/login'));
router.use('/',require('./controller/index'));


module.exports=router;