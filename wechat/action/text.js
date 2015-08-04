//
// 作者：龙仕云  2014-3-18
// 文本信息推送器 
//



module.exports = function(message, req, res, next){
  //console.log(message);
  
  var input = (message.Content || '').trim();
  var content = '无法给你正确回复，请点击功能菜单。';

  res.reply(content);
  
};