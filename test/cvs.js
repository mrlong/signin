var csv = require('csv');
var fs=require("fs");  


var csvfile = process.cwd() + '/../upload/import.csv';

console.log(csvfile);
var input=fs.createReadStream(csvfile);
  
fs.readFile(csvfile,'utf-8',function(err,data){  
    if(!err){  
        data.split('\n').forEach(function(row){
          console.log('ss' +  row);
        });
        //console.log(data);  
    }else{  
        console.log(data);    
    }  
});  


  
