var models = require('../config/config');
var mysql = require('mysql');

// 连接数据库
// var conn = mysql.createConnection(models.mysql);
// conn.connect();

var pool = mysql.createPool({
  connectionLimit : 1000,
  connectTimeout  : 60 * 60 * 1000,
  aquireTimeout   : 60 * 60 * 1000,
  timeout         : 60 * 60 * 1000,
  host: models.mysql.host,
  user: models.mysql.user,
  password: models.mysql.password,
  database: models.mysql.database,
  port: models.mysql.port
});

// var query=function(sql,callback){
//   pool.getConnection(function(err,conn){
//     if(err){
//       callback(err,null,null);
//     }else{
//       conn.query(sql,function(err,results,fields){
//         //释放连接
//         conn.release();
//         //事件驱动回调
//         callback(err,results,fields);
//       });
//     }
//   });
// };

var query = function(sql){
  return new Promise(function (resolve,reject) {
    pool.getConnection(function(err,conn){
      if(err){
        reject(err);
      }else{
        conn.query(sql,function(err,rows,fields){
          //释放连接
          conn.release();
          //传递Promise回调对象
          resolve({
            "err":err,
            "rows":rows,
            "fields":fields
          });
        });
      }
    })
  })
}
module.exports=query;
