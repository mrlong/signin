var Api = require('../wechat/api');
var wx = require('../service/wechat');

var obj = require('../lib/obj');



//var myopenid='o5-CDjkrJNC-_MuH_w1mBxjMQnUw';
//Api.getUser(myopenid,function(err,data){
//  
//  console.log(err);
//  console.log(data);
//
//});
//


//获取永二维码
//
//{ ticket: 'gQGd8ToAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL01IV0dsUTdsNWdTZk5XT
//lJUVmtqAAIEx5SUVQMEAAAAAA==',
//  url: 'http://weixin.qq.com/q/MHWGlQ7l5gSfNWNRTVkj' }
  

//Api.createLimitQRCode(1,function(err,data){
//  console.log(err);
//  console.log(data);
//  if (data.ticket)
//    console.log(Api.showQRCodeURL(data.ticket));
//});


console.log('111');
//生成临时的二维码


var o = new obj({
  name:'sss'
});
o.code = o.newTmpSceneId(1);

console.log(o.code);
wx.createTmpQRCode(o.code,function(err,data){
  console.log(data);
   var imgurl = wx.showQRCodeURL(data.ticket);
  console.log(imgurl);
})











