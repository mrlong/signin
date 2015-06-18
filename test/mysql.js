var Db = require('../lib/db');


Db.query('select * from meeting order by meet_time desc ',function(err,rows){

  console.log(err);
  
});