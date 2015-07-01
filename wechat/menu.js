//
// api 功能扩展
//
// 菜单设计
//
//

var config = require('../config');
var OAuth = require('./oauth');

var api = require('./api');
var client = new OAuth(config.wechat.appid, config.wechat.appsecret);

var menu = {
 "button":[
   {  
      "name":"产品与服务",
      "sub_button":[
        
      
      ];
   },
   {
     "name":"擎洲云",
     "sub_button":[
       {  
         "type":"view",
         "name":"签到",
         "url":client.getAuthorizeURL(config.domain + "/admin") 
       },
       {
         "type":"click",
         "name":"赞一下我们",
         "key":"V1001_GOOD"
       }]
  }]
};



//创建菜单
exports.createmenu = function(){
  config.debug || console.log(menu);
  api.createMenu(menu,function(err,result){
    if(err){
      config.debug||console.log('wechat api create menu :' + err);  
    }
  });
};





