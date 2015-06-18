/*
 * 作者：龙仕云  2014-5-28
 * 接收到的包进行封装
 * 处理xxs
 * trim 等值
 *
 * 第三方组件： 
 *  validator : http://github.com/chriso/node-validator 1.5.1 ,发现用新版本有问题。3.0
 * 
 */
   
//var sanitize = require('validator').sanitize;

var obj=function(items){
  cloneAll(items,this);
};

obj.prototype.xss=function(){

  //for (var key in this){
  //  if(this[key] && typeof(this[key])!='function'){
  //    this[key] = sanitize(this[key]).xss();
      //console.log(key);
      //console.log(this[key]);
  //  }
  //};
  return this;
};

obj.prototype.trim=function(){
  for (var key in this){
    //if(typeof(this[key])!='function'
    if( this[key] && typeof(this[key])=='string'){
      this[key] = this[key].trim();
    }
  };
  return this;
};

//对象拷贝
function cloneAll(source,dirc){
  for(var key in source){
    if(typeof source[key] == "object"){
      dirc[key]= new obj;            
      cloneAll(source[key],dirc[key]);            
      continue;        
    }
    else{         
      dirc[key] = source[key]; 
    }   
  }   
};

obj.prototype.clone=function(source){
  cloneAll(source,this);
  return this;
};

//生成guid号
obj.prototype.newGuid=function(){
  var guid = "";
  for (var i = 1; i <= 32; i++){
    var n = Math.floor(Math.random()*16.0).toString(16);
    guid +=   n;
    if((i==8)||(i==12)||(i==16)||(i==20))
      guid += "-";
  }
  return guid;    
};

//生成订单单号
//'订单号 格式:库存类型（0,1）+ 时间到秒 + 流水号3位',
obj.prototype.newOrderCode = function(tyle){
  var code = tyle;
  var d = new Date();
  
  code += d.getFullYear() + '' +
          (d.getMonth()<9?'0' + (d.getMonth()+1):(d.getMonth()+1)+'') +
          (d.getDate()<10?'0'   + d.getDate():d.getDate() +'') +
          (d.getHours()<10?'0' + d.getHours():d.getHours()+'') +
          (d.getMinutes()<10?'0' + d.getMinutes():d.getMinutes()+'') + 
          (d.getSeconds()<10?'0' + d.getSeconds():d.getSeconds()+'');
  
  code += Math.ceil(Math.random()*9) + '' +
          Math.ceil(Math.random()*9) + '' +
          Math.ceil(Math.random()*9);
  
  return code;
};

//
// 获取时间的时间截。
//
obj.prototype.curtimestamp =function(curdate){
  var mydate = curdate || new Date();
  
  return Math.round(mydate.getTime()/1000);
};

exports = module.exports = obj;

