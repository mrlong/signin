var express = require('express');
var router = express.Router();
var Db = require('../../lib/db');



router.get('/',function(req,res,next){
  var meet_guid = req.query.meet_guid;
  res.loadview('signin/index.html',{meet_guid:meet_guid});
});





module.exports = router;