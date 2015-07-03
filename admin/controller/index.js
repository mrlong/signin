var express = require('express');
var router = express.Router();
var Db = require('../../lib/db');
var wechatservice = require('../../service/wechat');


router.get('/edit/:guid',function(req,res,next){
  
  var myguid = req.params.guid;
  Db.query('select *,DATE_FORMAT(meet_time, "%Y-%m-%d") AS meet_time  from meeting where meet_guid=?',myguid,function(err,rows){
    if(!err && rows.length>0){
      res.loadview('index/editmeeting.html',{row:rows[0],hasnew:false});
    }
    else{
      res.msgBox('读取出错'+err); 
    }
  });

});
router.post('/edit/:guid',function(req,res,next){
  //保存了
  var  myguid = req.params.guid;
  var  meet_title = req.body.meet_title;
  var  meet_time = req.body.meet_time;
  var  meet_status = req.body.meet_status;
  var  meet_sceneid = parseInt(req.body.meet_sceneid);
  var  meet_content = req.body.meet_content;
  
  if (meet_sceneid!=1 && meet_sceneid !=2 && meet_sceneid !=3 && meet_sceneid !=4){
    res.msgBox('你的二维码编号必须填写出错，只能填 1，2，3，4 中的一个值。');
    return;
  };
  
  //开始写入库。 UNIX_TIMESTAMP
  Db.query('update meeting set meet_title=?,meet_time=?,meet_status=?,meet_sceneid=?,meet_content=? where meet_guid=? ',
          [meet_title,meet_time,meet_status,meet_sceneid,meet_content,myguid],function(err,row){
    if(!err && row.changedRows>0){
      res.redirect('/admin');
    }
    else{
      res.msgBox(err?'保存出错' + err:"你保存的值没有变化。"); 
    }
  
  });
  
});

//增加
router.get('/add',function(req,res,next){
  res.loadview('index/editmeeting.html',{row:{},hasnew:true}); 
});

router.post('/add',function(req,res,next){
  var newdata= {
    meet_guid: Db.newGuid(),
    meet_title: req.body.meet_title,
    meet_time:req.body.meet_time,
    meet_status:req.body.meet_status,
    meet_sceneid:parseInt(req.body.meet_sceneid),
    meet_content:req.body.meet_content,
  };
  Db.query('insert into meeting set ?',newdata,function(err,rows){
    if(!err && rows.affectedRows >0){
      newdata.success=true;
      res.redirect('/admin');
    }
    else{
      res.msgBox('创建会议活动出错。');    
    };
  });

});


//详情
router.get('/info/:guid',function(req,res,next){
  var myguid = req.params.guid;
  Db.query('select *,DATE_FORMAT(meet_time, "%Y-%m-%d") AS meet_time  from meeting where meet_guid=?',myguid,function(err,rows){
    if(!err && rows.length>0){
      if (rows[0].meet_sceneid && rows[0].meet_sceneid>=0){
        wechatservice.qrcodeurl(rows[0].meet_sceneid,function(err,url){
          res.loadview('index/meetinginfo.html',{row:rows[0],qrcodeurl:url});  
        });
      }
      else
        res.loadview('index/meetinginfo.html',{row:rows[0],qrcodeurl:''});
    }
    else{
      res.msgBox('读取出错'+err); 
    }
  });
});

router.get('/info/pic/:guid',function(req,res,next){
  var myguid = req.params.guid;
  Db.query('select count(*) as total,meus_sginin from meeting_usr where meet_guid=? group by meus_sginin ',myguid,function(err,rows){
    if(!err && rows.length>0){
      res.json({success:true,msg:'成功',data:rows}); 
    }
    else{
      res.json({success:false,msg:'读取出错'+err}) 
    }
  });
});

router.get('/users/:guid',function(req,res,next){
  var myguid = req.params.guid;
  Db.query('select * from meeting where meet_guid=?',myguid,function(err,meeting){
    
    if(!err && meeting.length>0){
      Db.query('select * from meeting_usr where meet_guid=? order by meus_name ',myguid,function(err,rows){
        res.loadview('index/users.html',{meeting:meeting[0],rows:rows});
      });  
    }
    else{
      res.msgbox('无效的会议活动。') 
    }
  });
});




router.get('/',function(req,res,next){
  //%H:%i:%s
  Db.query('select *,DATE_FORMAT(meet_time, "%Y-%m-%d ") AS meet_time from meeting order by meet_time desc',function(err,rows){
    if(!err){
      res.loadview('index/index.html',{rows:rows}); 
    }
    else{
      res.msgbox('出错');
    }
  });
    

    
  //redirect  
});




module.exports = router;