
var express = require('express');
var router = express.Router();

//网站的主页。
router.use(function(req,res,next){
  res.viewstyle = 'admin'; 
  
  if(req.session.openid || req.originalUrl=='/admin/login'){
    next(); 
  }
  else{
    res.redirect('/admin/login'); 
  }
});

router.use('/import',require('./controller/import'));
router.use('/fans',require('./controller/fans'));
router.use('/user',require('./controller/user'));
router.use('/login',require('./controller/login'));
router.use('/',require('./controller/index'));


module.exports=router;