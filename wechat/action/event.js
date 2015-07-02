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
  console.log(event);
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
    if(event.EventKey=='V1002'){
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
    else if(event.EventKey=='V1003'){
      res.reply('你好，我是你的专门客服。'); 
    }
    else if(event.EventKey=='V1004'){
      res.reply('你好，我是你的专门客服。');   
    }
    else{
      res.reply('不要随意的点，现在还不支持。');
    }
  }
  /////////////////////////////////////// 已关注之后，扫二维的事件//////////////////////////////////////
  else if(event.Event =='SCAN'){
    console.log('aaa');
    User.SCAN(event,function(err,content){
      console.log('111');
      console.log(content);
      if(!err){
        res.reply(content); 
      }
      else{
        res.reply('无活动可参与。(二维码号:' + event.EventKey + ')' + err); 
      }
    });
  }
  else {
  	res.reply('暂未支持! Coming soon!-1');
  }
};



