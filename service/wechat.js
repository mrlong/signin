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
                     'user_headimgurl_96=?,user_headimgurl_132=?,user_status=0,user_nickname=?,user_city=?,user_province=?,user_country=?  where user_openid=?',
                     [img0,img46,img64,img196,img132,user.nickname,user.city,user.province,user.country,user.openid],function(err){
                config.debug || console.log( err?'获取用户的头像出错'+err:'获取用户的头像成功success');
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
var dosubscribe = function(user,fn){
  var mythis = this;
  Db.query('select user_openid from users where user_openid=?',[user.openid],function(err,rows){
      //已存在，只做更新了。
      if(rows && rows.length>0){  
        donwloaduserheadimg(user,function(err){
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
        indata.user_status = 0;
        indata.trim();
        
        Db.query('insert into users set ?',indata,function(err,rows){
          //下载头像图片
          donwloaduserheadimg(user,function(err){
            if(fn) fn(err,true);
          });          
        });      
      }
    });   
};
exports.subscribe = dosubscribe;


//
// 用户取消关注了
//
exports.unsubscribe = function(openid,fn){
  Db.query('update users set user_status=1 where user_openid=?',
           [openid],function(err){
    if(fn)fn(err);
  });
};

//
// 扫一扫发生的事件
// { ToUserName: 'gh_8becb66494ae',
//  FromUserName: 'o5-CDjkrJNC-_MuH_w1mBxjMQnUw',
//  CreateTime: '1435801654',
//  MsgType: 'event',
//  Event: 'SCAN',
//  EventKey: '1',
//  Ticket: 'gQGd8ToAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL01IV0dsUTdsNWdTZk5XTlJUVmtqAAIEx5SUVQMEAAAAAA==' }
// 参数： event 
// 返回值:  err ,content (微信的回复内容)
//

exports.SCAN=function(event,fn){
  
  if(event.EventKey.indexOf('qrscene_')>=0){
    var key = parseInt(event.EventKey.substring(8));  
  }
  else{
    var key = parseInt(event.EventKey);
    
    //有可能已关注了，但功能后开发，用户信息没有及时更新。
    Api.getUser(event.FromUserName,function(err,data){
      if(!err){dosubscribe(data);}
    });
  }
  var content;
  Db.query('select * from meeting where meet_status !=0 and meet_sceneid=? order by meet_time desc ',key,function(err,rows){
    if(!err && rows.length>0){
      content = eval('([' + rows[0].meet_content + '])');
      if(content && content instanceof Array){
        //在所路径后面增加当前会议的guid
        for(var i=0;i<content.length;i++){
          if(content[i].url){ 
            content[i].url = content[i].url + (content[i].url.indexOf("?")<0?"?":"&") + "meet_guid=" + rows[0].meet_guid; 
            content[i].url = content[i].url + "&openid=" + event.FromUserName; //带上openid 为了后面取值之用。
          }
        };
        if(fn) fn(null,content);  
      }
      else{
        if(fn) fn(new Error('编辑回复内容的格式出错'));     
      }
    }
    else{
      if(err){
        if(fn) fn(err);
      }
      else{
        if(fn) fn(new Error('没有参与的活动'));  
      }
    }
  });
};

//
// 取出永久二维码的地址
// 参数： 1 为编号
// 返回值:
//  err, url
exports.qrcodeurl=function(id,fn){
  Api.createLimitQRCode(id,function(err,data){
    if(!err && data.ticket){
      if(fn) fn(null,Api.showQRCodeURL(data.ticket));
    }
    else {
      if(fn) fn(err); 
    }
  }); 
};

//
//签到成功之后，发送信息
//格式：
//{{first.DATA}}
//会议名称：{{keyword1.DATA}}
//签到时间：{{keyword2.DATA}}
//{{remark.DATA}}
//
exports.msgSignin=function(openid,data,cb){
  
  var templateid = 'yYk76GlBCvueuHHdBZJAqEyWFB3DrBVHpdN6vRxtlBI';
  var topcolor = '#FF0000'; // 顶部颜色
  //var url = config.domain +  data.url + '?openid=' + openid;
  var url = null;
  Api.sendTemplate(openid,templateid,url,topcolor,data,function(err,result){
    if(err){
      if(cb) cb(err);
      //不成功是否要定入库内，由定时器再来发送
      return;
    };
    if(cb) cb(null);
  });
};


