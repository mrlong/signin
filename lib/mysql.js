////////////////////////////////////////////////////////////
//
//  mysql 数据库的封装
//  作者: 龙仕云 2014－4－30
//
//
//
///////////////////////////////////////////////////////////

var mySQL  = require('mysql');
var pool = require('./mysql_pool');

var config = require('../config');



//连接mysql 
mysql = function(){

};

//
// m = true 表示可以执行多个sql 
// callback:
//   err,connection   
//
//
mysql.prototype.open = function(m,callback){
  var mym = false;
  var mycallback;
  
  if ( typeof m === 'boolean'){
    mym = m;
    mycallback = callback;
  }
  else{
    mycallback = m; 
  };
  
  var sqlconfig = {};
  this.cloneAll(config.mysql,sqlconfig);
  sqlconfig.multipleStatements = mym;  //可以执行多个语句
  
  //this.pool = mySQL.createPool(sqlconfig);
  pool.getConnection(function (err, conn){
    if(!err){
      if (mym == true){
        
      };
      config.debug || console.log('mysql.open()');
      if(mycallback){mycallback(null,conn)}
    }
    else{
      if(mycallback){mycallback(err)} 
    };
  });
    
  /*
  this.connection = mySQL.createConnection(sqlconfig);
  this.connection.connect(function(err){
    if(err){
      if(mycallback){mycallback(err)}
      //console.error('connect mysql to %s error: ', config.mysql.host, err.message);
      //process.exit(1);
    }
    else{
      config.debug || console.log('mysql.open()');
      if (mycallback) {mycallback(null);};
    }
  });
  */
};

mysql.prototype.close = function(callback){
  //if (this.connection){
  //  config.debug || console.log('mysql.close()');
  //  this.connection.end(callback);  
  //};
};

/*
 *  1. sql.query('select * from ims_members where username=?',['mrlong'],function(err,result){
 *     if(err){
 * 
 *     }
 *     else{
 * 
 *     });
 *
 * 2. var post  = {id: 1, title: 'Hello MySQL'};
 *    mysql.query('INSERT INTO posts SET ?', post, function(err, result) {
 *  
 *     //..
 * 
 *    }); INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
 *
 *
 * 3. mysql.query('INSERT INTO posts SET ?', {title: 'test'}, function(err, result) {
 *       if (err) throw err;
 *
 *       console.log(result.insertId);
 *    });
 *
 * 4. mysql.query('DELETE FROM posts WHERE title = "wrong"', function (err, result) {
 *      if (err) throw err;
 *
 *      console.log('deleted ' + result.affectedRows + ' rows');
 *    })
 *
 *
 * 5. mysql.query('UPDATE posts SET ...', function (err, response) {
 *     if (err) throw err;
 *
 *     console.log('changed ' + result.changedRows + ' rows');
 *    })
 *
 *    rows的内容：
 *      affectedRows: 0  //新增
 *      changedRows: 0   //修改
 *      fieldCount: 0
 *      insertId: 0
 *      message: "(Rows matched: 0  Changed: 0  Warnings: 0"
 *      protocol41: true
 *      serverStatus: 2
 *      warningCount: 0
 */

mysql.prototype.query = function(sql,data,callback){
  if(pool){
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

    config.debug || console.log(' mysql.query()');
    //config.debug || console.log(sql);
    pool.getConnection(function (err, conn){
      if(err){
        conn.release();
        if(callback){callback(new Error('数据库连接池取错'),null)} 
      }
      else{  
        var q = conn.query(sql,data,function(err,rows){
          conn.release();// release();
          if(err){
            if(callback){callback(err,null)}
          }
          else{
            if(callback){callback(err,rows)};   
          };
          
        });
        config.debug || console.log(q.sql);
      }
    });
  }
  else{
    if(callback){callback(new Error('没有打开数据库，请执行open。'),null)}
  }
};


mysql.prototype.test = function(){
   pool.getConnection(function (err, conn){
     
    if(!err && conn){
      conn.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (err) throw err;
      console.log('The solution is: ', rows[0].solution);
      });
    }
    else{
      console.log('没有打开数据库，请执行open。');
    };
  });
};




//对象拷贝
mysql.prototype.cloneAll=function(source,dirc){
  for(var key in source){
    if(typeof source[key] == "object"){
      dirc[key]= new obj;            
      this.cloneAll(source[key],dirc[key]);            
      continue;        
    }
    else{         
      dirc[key] = source[key]; 
    }   
  }   
};


module.exports=mysql;