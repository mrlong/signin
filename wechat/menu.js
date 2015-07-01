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
        {
          "type":"view",
          "name":"了解擎洲",
          "url":"sss"
        },
        {
          "type":"click",
          "name":"联系电话",
          "key":"V1002"
        },
        {
          "type":"click",
          "name":"客服QQ",
          "key":"V1003"
        },
        {
          "type":"click",
          "name":"加入QQ群",
          "key":"V1004"
        }
      
      ]
   },
   {
      "name":"咨询与观点",
      "sub_button":[
        {
          "type":"view",
          "name":"热门活动",
          "url":""  
        },
        
        {
          "type":"view",
          "name":"行业资讯",
          "url":""
        },
        {
          "type":"view",
          "name":"法律法规",
          "url":""
        }
        
      ]
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





