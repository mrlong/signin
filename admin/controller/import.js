var express = require('express');
var router = express.Router();
var Db = require('../../lib/db');
var fs=require("fs");  


router.get('/:guid',function(req,res,next){
  var myguid = req.params.guid;
  
  Db.query('select count(*) as rowcount from meeting_usr order by meus_phone',function(err,rows){
    if(!err){
      res.loadview('import/import.html',{rowcount:rows[0].rowcount,meet_guid:myguid}); 
    }
    else{
      res.msgBox('出错');
    }
  });
  
    
});

           
router.post('/push/:guid',function(req,res,next){
  var meet_guid = req.params.guid;
  
  var csvfile = process.cwd() + '/upload/import.csv';
  
  //1.先清原来的数据
  Db.query('delete from meeting_usr where meet_guid=?',meet_guid,function(err){
    if(!err){
      //2读取csv文件的数据 readFileSync
      fs.readFile(csvfile,'utf-8',function(err,data){  
        if(!err){  
            var rowcount = 0;
            var rowyes = 0; //有效数据行
            var rownot = 0; //无效数据行
            data.split('\n').forEach(function(row){
              //console.log(row);
              ++rowcount;
              //第五行之后才算是正式数据
              if (rowcount>5){
                values = row.split(',');
                if (values.length >=2){
                  var rowdata ={
                    meet_guid:meet_guid,
                    meus_name:values[0],
                    meus_phone:values[1],
                    meus_unit:values[2],
                    meus_msg:values[3]
                  };
                  Db.query('insert into meeting_usr set ?',rowdata,function(err){
                    if(err){
                      rowyes++;
                    }
                    else{
                      console.log(err); 
                    }
                  });
                }
                else{
                  rownot++;  
                }

              };

            });
          
          res.json({success:true,msg:'导入动作已后台执行，是否完成还要查看名单。'});
        }else{  
          res.json({success:false,msg:'导入出错,文件是否还在打开，请关闭。'+ err});    
        }  
      });  
      
    }
    else{
      console.log(err);
      res.json({success:false,msg:'清空原来的数据出错,'+ err}); 
    };
  });
});


router.post('/upload',function(req,res,next){
  if (req.files && req.files.codecsv != 'undifined') {  
    var temp_path = req.files.codecsv.path;  
    if (temp_path) {  
      
      fs.readFile(temp_path, 'utf-8', function(err, content) {  
        //文件的内容  
        var csvfile = process.cwd() + '/upload/import.csv';
        fs.writeFileSync(csvfile,content);
        // 删除临时文件  
        fs.unlink(temp_path);  
        res.json({success:true,msg:'上传的文件成功。'});
      }); 
      
    }
    else{
      res.json({success:false,msg:'无法获取上传的文件。'});  
    }
  }
  else{
    res.json({success:false,msg:'无法获取上传的文件。'})  
  }
});




module.exports = router;