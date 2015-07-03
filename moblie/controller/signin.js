var express = require('express');
var router = express.Router();
var Db = require('../../lib/db');



router.get('/',function(req,res,next){
  var meet_guid = req.query.meet_guid;
  var openid = req.query.openid;
  
  //有可能以前保存下来的电话，查users表。
  
  Db.query('select user_phone from users where openid=? ',openid,function(err,rows){
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
  
  res.json({success:true,msg:meet_guid+user_phone+openid+user_phone_old});
  
  //电话不一样，写入user库
  if(user_phone_old != user_phone){
    
  };

});





module.exports = router;