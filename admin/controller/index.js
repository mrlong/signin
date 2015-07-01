var express = require('express');
var router = express.Router();
var Db = require('../../lib/db');


router.get('/',function(req,res,next){
  
  Db.query('select *,DATE_FORMAT(meet_time, "%Y-%m-%d %H:%i:%s") AS meet_time from meeting order by meet_time desc',function(err,rows){
    if(!err){
      res.loadview('index.html',{rows:rows}); 
    }
    else{
      res.msgbox('出错');
    }
  });
    

    
  //redirect  
});




module.exports = router;