//
// 作者：龙仕云  2014-3-18
// 文本信息推送器 
//



module.exports = function(message, req, res, next){
  //console.log(message);
  
  var input = (message.Content || '').trim();
  var content = '请你下面的菜单';

  res.reply(content);
  
};