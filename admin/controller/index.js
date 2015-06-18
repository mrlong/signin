var express = require('express');
var router = express.Router();
var Db = require('../../lib/db');


router.get('/',function(req,res,next){
  
  Db.query('select * from meeting order by meet_time desc',function(err,rows){
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