var express = require('express');
var router = express.Router();
var Db = require('../../lib/db');


router.get('/',function(req,res,next){
  var imgurl = '';
  res.loadview('login.html',{imgurl:imgurl});

});




module.exports = router;