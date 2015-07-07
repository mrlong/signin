var express = require('express');
var router = express.Router();
var Db = require('../../lib/db');


router.get('/',function(req,res,next){
  
  Db.query('select * from users where user_status=0',function(err,rows){
    if(!err && rows.length>0 ){
      res.loadview('/fans/index.html',{rows:rows});
    }
    else{
      res.loadview('/fans/index.html',{rows:rows});
      //res.msgBox(err?'读取数据失败'+err:'人气太差，加油。');
    }
  });
  
});


module.exports = router;