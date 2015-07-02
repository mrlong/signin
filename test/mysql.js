var Db = require('../lib/db');


/*Db.query('select * from meeting order by meet_time desc ',function(err,rows){

  console.log(err);
  
});
*/
/*

Db.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});*/


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '192.168.1.58',
  user     : 'root',
  password : '12345678',
  database: 'signin'
});

//connection.connect();
//
//connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//  if (err) throw err;
//
//  console.log('The solution is: ', rows[0].solution);
//});
//
//
//connection.end();

connection.connect();

connection.query('select * from meeting', function(err, rows) {
  if (err) throw err;
  console.log('The solution is: ', rows);
});

connection.end();

Db.query('select * from meeting order by meet_time desc ',function(err,rows){

  if (err) throw err;
  console.log('The solution is: ', rows);
  
});


Db.query('select user_openid from users where user_openid=?',['ssss'],function(err,rows){
  console.log(err);
  console.log(rows);
})