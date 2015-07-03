var express = require('express');
var router = express.Router();
var Db = require('../../lib/db');



router.get('/',function(req,res,next){
  var meet_guid = req.query.meet_guid;
  var openid = req.query.openid;
  
  //有可能以前保存下来的电话，查users表。
  Db.query('select user_phone from users where user_openid=? ',openid,function(err,rows){
    var myphonecode ;
    if(!err && rows){
        myphonecode = rows[0].user_phone;
    };
    res.loadview('signin/index.html',{meet_guid:meet_guid,openid:openid,
                                      user_phone:myphonecode,user_phone_old:myphonecode});  
  });
  
  
});

router.post('/',function(req,res,next){
  
  var openid = req.body.openid;
  var meet_guid = req.body.meet_guid;
  var user_phone = req.body.user_phone;
  var user_phone_old = req.body.user_phone_old; //原来老的，如不一样则要写入库了。
  
  //写入库内并处理
  Db.query('update meeting_usr set meus_sginin=true,meus_openid=? where meet_guid=? and meus_phone=? and meus_sginin=false ',
           [openid,meet_guid,user_phone],function(err,rows){
    
    if(!err){
      if(rows.changedRows>0){
        res.json({success:true,msg:"签到成功"});
        
        //发送信息
        Db.query('select meus_msg from meeting_usr where where meet_guid=? and meus_phone=?',
                 [meet_guid,user_phone],function(err,rows){
          if(!err && rows.length>0){
            if(rows[0].meus_msg && rows[0].meus_msg.trim() !=''){
              //处理信息了。  
            };
          };
        });
      }
      else{
        res.json({success:false,msg:'签到失败，怀疑无签到数据或已经签到。'});   
      }
    }
    else{
      res.json({success:false,msg:'服务器更新签到数据出错'});
    }
  
  });
  
  
  //电话不一样，写入user库
  if(user_phone_old != user_phone){
    Db.query('update users set user_phone=? where user_openid=? ',[user_phone,openid]);
  };

});



module.exports = router;