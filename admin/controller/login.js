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
  var sid = new Obj().newTmpSceneId(0); //0=登录
  wx.createTmpQRCode(sid,600,function(err,data){
    var d = new Date();
    d.setMinutes(d.getMinutes()+10);
    if(!err){
      var newData = {
        qrco_num:sid,
        qrco_type:0, //0=登录
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
router.post('/time/:sid',function(req,res,next){
  var sid = req.params.sid;
  Db.query('select qrco_openid from qrcode where qrco_num=? and qrco_type=0 and qrco_use=true and now()< qrco_expire',
           [sid],function(err,rows){
    if(!err && rows.length>0){
      //查这个openid 是不是管理者
      var openid = rows[0].qrco_openid;
      Db.query('select * from manager where mana_openid=?',openid,function(err,rows){
      if(!err && rows.length>0){
        req.session.openid=openid; 
        res.json({success:true,msg:'登录成功',waiting:false});
      }
      else{
        res.json({success:false,msg:'无权限',waiting:false});    
      }})
    }
    else{
      res.json({success:false,msg:'',waiting:true});  
    }
  });
});




module.exports = router;