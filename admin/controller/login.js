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




module.exports = router;