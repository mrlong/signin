//
// api 功能扩展
//
// 菜单设计
//
//

var config = require('../config');
var API = require('wechat-api');

var api = new API(config.wechat.appid,config.wechat.appsecret);


module.exports = api;

