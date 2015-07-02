
var express = require('express');
var router = express.Router();

//移动页。
router.use(function(req,res,next){
  res.viewstyle = 'moblie';   
  next(); 
});

router.use('/signin',require('./controller/signin'));


module.exports=router;