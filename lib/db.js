

var mySQL = require('./mysql');
var config = require('../config');
var pool = require('./mysql_pool');

/*
 * 直接执行SQL语言
 * 
 * sql 为语言,支持多个sql ,用;分开。
 * data 参数
 * callback
 *   err
 *   results   //返回值
 *
 */
/*     rows的内容：
 *      affectedRows: 0  //新增
 *      changedRows: 0   //修改
 *      fieldCount: 0
 *      insertId: 0
 *      message: "(Rows matched: 0  Changed: 0  Warnings: 0"
 *      protocol41: true
 *      serverStatus: 2
 *      warningCount: 0
 */

exports.query = function(sql,data,callback){
  var mym = false;
  var mycallback;
  var mydata;
  if (typeof data === 'function'){
    mycallback = data;
    mydata = [];
  }
  else{
    mycallback = callback;
    mydata = data;
  };
  
  mym = sql.split(';').length > 1;  //有多个sql了
  pool.query(sql,data,function(err,rows){
    if(!err){
      if(mycallback) mycallback(null,rows); 
    }
    else{
      if(mycallback) mycallback(err,null); 
    }
  });
  
};

//
// option {
//  multipleStatements : true   //表示可以执行多个
// }
// callback : function(err,conn){}
exports.open=function(option,callback){
  var myoption;
  var mycallback;
  
  if( typeof option === 'function'){
    myoption = {};
    mycallback = option;
  }
  else {
    myoption = option;
    mycallback = callback;
  };
  
  pool.getConnection(function(err,conn){
    if(!err){
      if(mycallback) mycallback(null,conn);
    }
    else{
      if(mycallback) mycallback(err,null); 
    }
  
  });
  
  
};

exports.newGuid=function(){
  var guid = "";
  for (var i = 1; i <= 32; i++){
    var n = Math.floor(Math.random()*16.0).toString(16);
    guid +=   n;
    if((i==8)||(i==12)||(i==16)||(i==20))
      guid += "-";
  }
  return guid;    
};


//随机数
var chars = ['0','1','2','3','4','5','6','7','8','9'];
exports.generateMixed=function(n){
   var res = "";
   for(var i = 0; i < n ; i ++) {
       var id = Math.ceil(Math.random()*9);
       res += chars[id];
   };
   return res;
};



//mysql = mySQL.createConnection(config.mysql);
//  mysql.connect(function(err){
//    if(err){
//      if(callback){callback(err)}
//    }
//    else{
//      
//      var q = mysql.query(sql,data,function(err,rows){
//        if(err){
//          if(callback){callback(err)}
//        }
//        else{
//          if(callback){callback(null,rows)};   
//        };
//        mysql.end();
//      });
//      config.debug || console.log(q.sql);      
//    }
//  });