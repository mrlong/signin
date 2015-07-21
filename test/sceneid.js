var obj = require('../lib/obj');

var o = new obj({
  name:'sss'
});
o.code = o.newTmpSceneId();

console.log(o.curtimestamp());
console.log(o.newTmpSceneId());
console.log(o);

var d = new Date();
d.setSeconds(d.getSeconds()+1800);
console.log(d)