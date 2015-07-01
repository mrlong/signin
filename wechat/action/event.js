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
var User = require('../../service/wechat_user.js');
var OAuth = require('../../service/wechat_oauth.js');

module.exports = function(event, req, res, next){
  
  //关注
  if (event.Event === 'subscribe') {
    User.getuser(event.FromUserName,function(err,data){
      if(!err){
        User.subscribe(data,function(err,isfirst){
          res.reply(isfirst?'欢迎你光临本店':'欢迎你你再次回到本店。'); 
        });
      }
      else{
        res.reply('无法获取你的基本信息，请取消关注。');    
      }
    });
    
  //取消关注  
  } else if (event.Event === 'unsubscribe') {
    User.unsubscribe(event.FromUserName,function(err){
      res.reply(err?'Bye! 谢谢你的关注下次再来。(清空状态出错)':'Bye! 谢谢你的关注下次再来。');  
    });
        
  } 
  ////////////////////////////////////////////////////////////
  else if (event.Event == 'VIEW'){

  }
  else if (event.Event =='CLICK'){
    
    if(event.EventKey=='V1001_TODAY_MUSIC'){
      res.reply('你好，我是你的专门客服龙仕云1。');
    }
    else{
      res.reply('不要随意的点，现在还不支持。');
    }
  }
  else {
  	res.reply('暂未支持! Coming soon!-1');
  }
};
