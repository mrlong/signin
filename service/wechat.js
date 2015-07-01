/*
//
//  微信的服务。
//  用于，提取人员信息。
//  用于，更新人员的基本信息功能。
//
*/

var Db  = require('../lib/db');
var Obj = require('../lib/obj');
var urllib = require('urllib');
var config = require('../config');

var Api = require('../wechat/api');


//获取用户基本信息
//Callback:
// err, 调用失败时得到的异常
// result, 调用正常时得到的对象
exports.getuser = function(openid,fn){
  Api.getUser(openid,fn);
};


//
//更新用户的头像
// user = api.getuser()
// fn: err
var donwloaduserheadimg = function(user,fn){
  var s = user.headimgurl;
  var img_url = s.substring(0,s.length-1);
  console.log('s='+s);
  console.log('image='+img_url);
  var img_url0  = img_url + '0';
  var img_url46 = img_url + '46';
  var img_url64 = img_url + '64';
  var img_url96 = img_url + '96';
  var img_url132= img_url + '132';
  
  //下载
  urllib.request(img_url0,{},function(err,img0){
    urllib.request(img_url46,{},function(err,img46){
      urllib.request(img_url64,{},function(err,img64){
        urllib.request(img_url96,{},function(err,img196){
          urllib.request(img_url132,{},function(err,img132){
            Db.query('update users set user_headimgurl_0=?,user_headimgurl_46=?,user_headimgurl_64=?,' + 
                     'user_headimgurl_96=?,user_headimgurl_132=?  where user_openid=?',
                     [img0,img46,img64,img196,img132,user.openid],function(err){
                config.debug || console.log( err?'获取用户的头像出错'+err:'获取用户的头像成功');
            });     
          });
        });
      });
    });
  });
  
  if(fn) fn();
};




//
//关注信息。
//user 为 api.getuser() 取出的返回值
//fn : err,isfirst=表示第一次关注
exports.subscribe = function(user,fn){
  var mythis = this;
  Db.query('select user_openid from user where user_openid=?',[user.openid],function(err,rows){
      //已存在，只做更新了。
      if(rows && rows.length>0){  
        mythis.updateuserinfo(user,function(err){
          if(fn)fn(err,false);
        }); 
      }
      //增加内容
      else{
        var indata = new Obj();
        indata.user_openid = user.openid;
        indata.user_nickname = user.nickname;
        indata.user_sex = user.sex;
        indata.user_city = user.city;
        indata.user_province = user.province;
        indata.user_country = user.country;
        indata.trim();
        
        Db.query('insert into user set ?',indata,function(err,rows){
          //下载头像图片
          donwloaduserheadimg(user,function(err){
            if(fn) fn(err,true);
          });          
        });      
      }
    });   
};


//
// 用户取消关注了
//
exports.unsubscribe = function(openid,fn){
  Db.query('update user set user_status=1 where user_openid=?',
           [openid],function(err){
    if(fn)fn(err);
  });
};
