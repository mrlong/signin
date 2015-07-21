var express = require('express');
var router = express.Router();
var Db = require('../../lib/db');
var wx = require('../../service/wechat');
var Obj = require('../../lib/obj');


/*
router.get('/',function(req,res,next){
  var imgurl = '';
  var sid = Db.newGuid();
  var url = config.domain + '/login?sid=' + sid;
  url = wx.getAuthorizeURL(url);
  console.log(req.originalUrl);
  //将sid写入库内
  var newdata = {
    logo_guid:sid,
    logo_expire: new Date()
  };
  Db.query('insert into logincode set ?',newdata,function(err,rows){
    if(!err && rows.affectedRows>0){
      imgurl = "http://qr.liantu.com/api.php?text=" + url;
      res.loadview('login.html',{imgurl:imgurl});  
    }
    else{
      res.msgBox('获取微信服务出错。'+err);   
    };
  });
});


*/

router.get('/',function(req,res,next){
  var imgurl = '';
  var sid = new Obj().newTmpSceneId();
  wx.createTmpQRCode(100001,function(err,data){
    var d = new Date();
    d.setSeconds(d.getSeconds()+data.expire_seconds);
    if(!err){
      var newData = {
        qrco_num:sid,
        qrco_type:0,
        qrco_expire: d
      };
      Db.query('insert into qrcode set ?',newData,function(err,rows){
        if(!err && rows.affectedRows>0){
          var imgurl = wx.showQRCodeURL(data.ticket);
          res.loadview('login.html',{imgurl:imgurl,expire:data.expire_seconds,sid:sid});      
        }
        else{
          res.msgBox('注册二维码服务出错。'+err);   
        };
      });    
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