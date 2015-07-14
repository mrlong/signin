
var express = require('express');
var router = express.Router();
var config = require('../config');

//微信内容
var wechat = require('wechat');
var text = require('./action/text');
var image = require('./action/image');
var location = require('./action/location');
var voice = require('./action/voice');
var video = require('./action/video');
var event = require('./action/event');
var link = require('./action/link');



/*router.use('/', function(req, res){
 res.send('Hello World-wechat');
});*/

/*
var mywechat = wechat(config.wechat.token, 
  wechat.text(text)      //文本
    .image(image)        //图片
    .location(location)  //位置
    .voice(voice)        //声音
    .video(video)        //视频
    .link(link)      
    .event(event));      //事件


module.exports=mywechat;
*/

//router.use('/', mywechat);
//module.exports = router;

module.exports = function(req,res,next){
  
  var message = req.weixin;
  console.log(message);
  
//  //'text', 'image', 'voice', 'video', 'location', 'link', 'event'
  if (message.MsgType=='text') {text(message,req,res,next)};
  if (message.MsgType=='event'){event(message,req,res,next)};
  if (message.MsgType=='image'){image(message,req,res,next)};
  if (message.MsgType=='voice'){voice(message,req,res,next)};
  if (message.MsgType=='video'){video(message,req,res,next)};
  if (message.MsgType=='location'){location(message,req,res,next)};
  if (message.MsgType=='link'){link(message,req,res,next)};
  

};
