var express = require('express');
var router = express.Router();
var Db = require('../../lib/db');
var wx = require('../../service/wechat');



router.get('/',function(req,res,next){
  
  var meet_guid = req.query.meet_guid;
  var openid = req.query.openid;
  
  Db.query('select meet_title,meet_status,DATE_FORMAT(meet_time, "%Y-%m-%d") AS meet_time from meeting where meet_guid=? ',meet_guid,function(err,rows){
    if(!err && rows.length>0){
      
      if(rows[0].meet_status==2){
      
        //有可能以前保存下来的电话，查users表。
        Db.query('select user_phone from users where user_openid=? ',openid,function(err,datas){
          var myphonecode ;
          if(!err && datas.length>0){
              myphonecode = datas[0].user_phone;
          };
          res.loadview('signin/index.html',{meet_guid:meet_guid,openid:openid,
                                            user_phone:myphonecode,
                                            user_phone_old:myphonecode,
                                            err:false,errormsg:"",
                                            meet_time:rows[0].meet_time,
                                            meet_title:rows[0].meet_title});  
        });
      }
      else{
        res.loadview('signin/index.html',{meet_guid:meet_guid,openid:openid,
                                          user_phone:'',user_phone_old:'',
                                          err:true,errormsg: rows[0].meet_title +'会议没有签到的状态，暂不能签到请稍候...',
                                          meet_time:'',
                                          meet_title:''});     
      }
    }
    else{
      res.loadview('signin/index.html',{meet_guid:meet_guid,openid:openid,
                                       user_phone:'',user_phone_old:'',err:true,errormsg:'没有找到的可签到的会议活动',
                                       meet_time:'',
                                       meet_title:''});    
    }
  });  
});

router.post('/',function(req,res,next){
  
  var openid = req.body.openid;
  var meet_guid = req.body.meet_guid;
  var user_phone = req.body.user_phone;
  var user_phone_old = req.body.user_phone_old; //原来老的，如不一样则要写入库了。
  var meet_time = req.body.meet_time;
  var meet_title = req.body.meet_title;
  
       
  //写入库内并处理
  Db.query('update meeting_usr set meus_sginin=true,meus_openid=? where meet_guid=? and meus_phone=? and meus_sginin=false ',
           [openid,meet_guid,user_phone],function(err,rows){
    
    if(!err){
      if(rows.changedRows>0){
      
        res.json({success:true,msg:"签到成功"});
        
        //发送信息
        Db.query('select meus_msg,meus_name from meeting_usr where  meet_guid=? and meus_phone=?',
                 [meet_guid,user_phone],function(err,rows){
          if(!err && rows.length>0){
            if(rows[0].meus_msg && rows[0].meus_msg.trim() !=''){
              //处理信息了。
              var d = new Date();
              var msgdata = {
                first:{value:rows[0].meus_name + '您好！',color:"#173177"},
                keyword1:{value:meet_title,color:"#2834c7"},
                keyword2:{value:d.getFullYear()+'-' + d.getMonth()+'-' + d.getDate() + ' ' + d.getHours()+ ':' + (d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes()),color:"#2834c7"},
                remark:{value:'会议安排:'+rows[0].meus_msg,color:"#173177"}
              };
              wx.msgSignin(openid,msgdata);
            };
          };
        });
        //end 
      }
      else{
        res.json({success:false,msg:'签到失败，请联系会务组。'});   
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