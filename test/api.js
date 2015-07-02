var Api = require('../wechat/api');

var myopenid='o5-CDjkrJNC-_MuH_w1mBxjMQnUw';
Api.getUser(myopenid,function(err,data){
  
  console.log(err);
  console.log(data);

});