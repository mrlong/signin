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
          "url":"http://mp.weixin.qq.com/s?__biz=MjM5MTAwNzQ2Mw==&mid=208152530&idx=1&sn=e3f39519c66285b8f9082a4ab21946c3"
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
          "url":"http://mp.weixin.qq.com/s?__biz=MjM5MTAwNzQ2Mw==&mid=208152530&idx=1&sn=e3f39519c66285b8f9082a4ab21946c3"  
        },
        
        {
          "type":"view",
          "name":"行业资讯",
          "url":"http://mp.weixin.qq.com/mp/getmasssendmsg?__biz=MjM5MTAwNzQ2Mw==#wechat_webview_type=1&wechat_redirect"
        },
        {
          "type":"view",
          "name":"法律法规",
          "url":"http://mp.weixin.qq.com/s?__biz=MjM5MTAwNzQ2Mw==&mid=208361083&idx=2&sn=ad3bd35bd21de7c5ce7765c0171030a3"
        }
        
      ]
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





