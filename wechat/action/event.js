///////////////////////////////////////////////////////////////////////////////
//
// 作者：龙仕云  2014－3－18
//
// 事件
//
///////////////////////////////////////////////////////////////////////////////

// message为事件内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'event',
  // Event: 'LOCATION',
  // Latitude: '23.137466',
  // Longitude: '113.352425',
  // Precision: '119.385040',
  // MsgId: '5837397520665436492' }

//var Api = require('../api');

var User = require('../../service/wechat.js');

module.exports = function(event, req, res, next){
  //console.log(event);
  //关注
  if (event.Event === 'subscribe') {
    User.getuser(event.FromUserName,function(err,data){
      if(!err){
        User.subscribe(data,function(err,isfirst){
          
          if(event.EventKey.indexOf('qrscene_')>=0){
            User.SCAN(event,function(err,content){
              if(!err){
                res.reply(content); 
              }
              else{
                res.reply('无活动可参与。(二维码号:' + event.EventKey + ')' + err); 
              }
            });
          }
          else{
            res.reply(isfirst?'感谢你关注擎洲公司官方唯一微信公众账号。':'感谢你再次关注擎洲公司官方唯一微信公众账号，说好不允许走了。');          
          }
        });
      }
      else{
        res.reply('无法获取你的信息，请取消关注。');    
      }
    });
    
  //取消关注  
  } else if (event.Event === 'unsubscribe') {
    User.unsubscribe(event.FromUserName,function(err){
      res.reply(err?'Bye! 谢谢你的关注下次再来。(清空状态出错)':'Bye! 谢谢你的关注下次再来。');  
    });
        
  } 
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  else if (event.Event == 'VIEW'){
    
  }
  else if (event.Event =='CLICK'){
    if(event.EventKey=='V1003'){
      res.reply("擎洲公司客服QQ竭诚为您服务：" +
                "计价、招投标类软件：" +
                "擎洲宝宝：755069890" +
                "擎洲贝贝：755167372" +
                "擎洲欢欢：200820978" +
                "擎洲迎迎：755085748" +
                "擎洲笑笑：188283969" +
                "擎洲乐乐：1773929229" +
                "算量类软件：" +
                "擎洲妮妮：200825297 " +  
                "擎洲宁宁：807656836 " +    
                "擎洲多多：1318270391" +  
                "擎洲亮亮：2502064849" +   
                "擎洲嘉嘉：1337222357"
      );
    }
    else if(event.EventKey=='V1002'){
      
      var msg="擎洲公司24小时服务热线" +
      "计价及其他服务热线：400-001-9090" +
      "算量产品服务热线：4000-166-166" +

      "擎洲公司各地分公司联系方式：" +
      "杭州一部（市区）：15382301050" +
      "杭州二部（周边）：15382301052" +
      "湖州大区：13388698257" +
      "衢州大区：15397591692" +
      "宁波舟山大区：15381888520" +
      "嘉兴大区：15325370918" +
      "金华绍兴大区：18067621219" +
      "台州大区：15397139690" +
      "温州丽水大区：13396959080"; 
      res.reply(msg); 
    }
    else if(event.EventKey=='V1004'){
      
      var msg=  "擎洲公司客户QQ群，期待您的加入，若群满请联系服务QQ：" +
        "杭州园林电子标群 136363576" +
        "擎洲广达杭州群（周边） 103606096" +
        "擎洲广达杭州群（市区） 416410783" +
        "擎洲广达嘉兴群 25786132" +
        "擎洲广达湖州群 79241524" +
        "擎洲广达温州群 132966461" +
        "擎洲广达丽水群 171922312" +
        "擎洲广达台州群 428031087" +
        "擎洲广达宁波群 341933607" +
        "擎洲广达金华群 121886387" +
        "擎洲广达绍兴群 23604988" +
        "擎洲广达衢州群 82711220" +
        "擎洲公路软件交流群 258613816" +
        "擎洲水利计价群 46206438" +
        "擎洲资料软件交流群 331285379" ;

      res.reply(msg);   
    }
    else{
      res.reply('现在还不开放该功能。');
    }
  }
  /////////////////////////////////////// 已关注之后，扫二维的事件//////////////////////////////////////
  else if(event.Event =='SCAN'){
    User.SCAN(event,function(err,content){
      if(!err){
        //这个是登录，则要处理session
        if(event.EventKey == 100001){
          //req.session.openid=event.FromUserName;
          //req.session.openid='sssss';
          console.log(req.session.openid+'--login');
        };
        res.reply(content); 
      }
      else{
        if(event.EventKey == 100001){
          res.reply( err + '(二维码号:' + event.EventKey + ')' + event.FromUserName);
        }
        else
          res.reply('无活动可参与。(二维码号:' + event.EventKey + ')' + err); 
      }
    });
  }
  else {
  	res.reply('暂未支持! Coming soon!-1');
  }
};



