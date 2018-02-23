var express = require('express');
var data = require('../models/model');
var router = express.Router();
var db = require('../db');



//DB connect middleware
// var checkDB = function(req,res,next){
//   if(db){
//     next();
//   }else{
//     db.connect(function(err){
//       if(err) {
//         throw err
//       }else{
//         next();
//       }
//     });
//   }
// }
//
// router.use(checkDB);

router.get('/skills', function(req, res) {
let resArr = [];
// console.log(db);
res.setHeader('Content-Type', 'application/json');
  try{
    if(db) {
        console.log("Database is connected ... nn");
        db.query('SELECT * from Skills', function(err, rows, fields) {
        if (!err){
          console.log('The solution is: ', rows);
          resArr = rows;
          if(resArr.length > 0){
            return res.send(resArr);
          }
      }
      else{
          console.log('Error while performing Query.');
          return res.send({"err":"either database connection is not established or data is empty"});
        }
      });
    } else {
        console.log("Error connecting database ... nn");
        return res.send({"err":"either database connection is not established or data is empty"});
    }
  }catch(e){
    console.log(e);
    return res.send({"err":"either database connection is not established or data is empty"});
  }
});

router.get('/',(req,res) => {
  if(data && data.length > 0){
  res.send(data);
}else{
  res.send({"err":"no data present"});
}
});

router.post('/skills', (req,res) =>{
          let skill = req.body.name;
          let status = req.body.status;
          let len;
          var resJson;
          console.log('skill',skill);
          console.log('status',status);

            try{
              if(skill && skill != ""){
                if(db){
                    console.log("Database is connected ... nn");
                    db.query('SELECT * from Skills', function(err, rows, fields) {
                    if (!err){
                      console.log('The solution is: ', rows);
                      len = rows.length;
                      const obj = {};
                      obj.id = len+1;
                      obj.name = skill;
                      obj.status = status;
                      db.query("INSERT INTO Skills (id, name, status) VALUES ("+len+1+","+skill+","+status+")",function(err,result){
                        if(err){
                          resJson = {"err":"error while adding in db"};
                            return res.send(resJson);
                        }else {
                        db.query('SELECT * from Skills', function(newerr, newrows, newfields){
                        //  return res.send({"success":newrows});
                        return res.send(newrows);
                        });
                        }
                      });
                  }
                  else{
                      console.log('Error while performing Query.');
                      resJson = {"err":"error while connecting to db"};
                      return res.send(resJson);
                  }
                  });
                }else{
                  resJson = null;
                }
              }else{
                resJson = {"err":"please add appropriate skill"};
                return res.send(resJson);
              }
            }catch(e){
              console.log(e);
              resJson = {"err":"error while connecting to db"};
              return res.send(resJson);
            }
});


router.put('/skills/:id/update',(req,res) =>{
let id = req.params.id;
let skill = req.body.name;
console.log('id & skill',id +" "+skill);
var edited = false;
var resJson;

        try{
          if(id && skill){
            if(db){
                console.log("Database is connected ... nn");
                  db.query('UPDATE Skills SET name = ? WHERE id = ?'+[skill,id],function(err,result){
                    if(err){
                      resJson = {"err":"error while adding in db"};
                      return res.send(resJson);
                    }else{
                    edited = true;
                    resJson = {"success":"edited appropriately"};
                    return res.send(resJson);
                    }
              });
            } else{
                  console.log('Error while performing Query.');
                  resJson = {"err":"error while connecting to db"};
                  return resJson;
                }
            }else{
             resJson = {"err":"please edit appropriately"};
             return res.send(errJson);
          }
        }catch(e){
          console.log(e);
            resJson = {"err":"error while connecting to db"};
            return res.send(resJson);
      }

});

router.put('/skills/:id/approve',(req,res) =>{

var resJson;
let id = req.params.id;
let status = req.body.status;
status = status.toString();
var edited = false;
console.log('id & status',id +" "+status );
      try{
        if(id){
          if(db){
              console.log("Database is connected ... nn");
                db.query('UPDATE Skills SET status= ? WHERE id = ?',[status,id],function(err,result){
                  if(err){
                    console.log('error while updating status');
                    resJson = {"err":"error while adding in db"};
                    return res.send(resJson);
                  }else{
                    edited = true;
                    console.log('Success updating status',result);
                    resJson = {"success":"status changed appropriately"};
                    return res.send(resJson);
                  }
            });
          } else{
                console.log('Error while performing Query.');
                resJson = {"err":"error while connecting to db"};
                return res.send(resJson);
              }
        }else{
           resJson = {"err":"please edit appropriately"};
           return res.send(resJson);
        }
      }catch(e){
        console.log(e);
        resJson = {"err":"error while connecting to db"};
        return res.send(resJson);
      }
});

router.get('/skillsearch/:skillname',(req,res) =>{

      let skill = req.params.skillname;
      console.log('requested skill ',skill);
      var resObj = {};

      if(skill){
          //If skill exists search in data
          console.log(data);
            if(data != null){
              for(let i = 0; i < data.length; i++){
                if(data[i] != null){
                  if(data[i].name.toLowerCase() === skill.toLowerCase()){
                    resObj = data[i];
                  }
                }
              }
            }
      }else{
        res.send(errJson);
        let errJson = {"err":"requested skill is not present"};
      }

    res.send(resObj);

});

module.exports = router;
