var express = require('express');
var router = express.Router();
var Db = require('../../lib/db');
var wx = require('../../service/wechat');


router.get('/',function(req,res,next){
  var imgurl = '';
  
  
  wx.createTmpQRCode(100001,function(err,data){
    if(!err){
      var imgurl = wx.showQRCodeURL(data.ticket);
      res.loadview('login.html',{imgurl:imgurl,expire:data.expire_seconds});     
    }
    else{
      res.msgBox('获取微信服务出错。');  
    }
  });
});

// http://xxxxx/admin/login/wx
router.get('/wx',function(req,res,next){
  var sid = req.query.sid;
  var openid  = req.query.openid;
  Db.query('select * from manager where mana_openid=?',openid,function(err,rows){
    if(!err && rows.length>0){
      req.session.openid=openid;
      res.end('登录成功');
    }
    else{
      res.end('登录失败');
    };
  });

});




module.exports = router;