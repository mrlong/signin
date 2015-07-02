var express = require('express');
var router = express.Router();
var Db = require('../../lib/db');


router.get('/edit/:guid',function(req,res,next){
  
  var myguid = req.params.guid;
  Db.query('select *,DATE_FORMAT(meet_time, "%Y-%m-%d") AS meet_time  from meeting where meet_guid=?',myguid,function(err,rows){
    if(!err && rows.length>0){
      res.loadview('index/editmeeting.html',{row:rows[0]});
    }
    else{
      res.msgBox('读取出错'+err); 
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