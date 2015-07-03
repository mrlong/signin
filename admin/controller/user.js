var express = require('express');
var router = express.Router();
var Db = require('../../lib/db');


router.get('/headimg/:openid',function(req,res,next){
  var openid = req.params.openid;
  
  Db.query('select user_headimgurl_46 from users where user_openid=?',
           openid,function(err,rows){
    if(!err && rows.length>0 && rows[0].user_headimgurl_46){
      res.set('Content-Type', 'image/jpg');
      res.status(200).send(rows[0].user_headimgurl_46); 
    }
    else{
      //取出默认的图片 
      res.redirect('/img/nohead.png');
    }
  });
  
});


module.exports = router;

