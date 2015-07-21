var obj = require('../lib/obj');

var o = new obj({
  name:'sss'
});
o.code = o.newTmpSceneId(1);

console.log(o.curtimestamp());
console.log(o.newTmpSceneId(1));
console.log(o);

var d = new Date();
d.setMinutes(d.getMinutes()+10);
console.log(d)