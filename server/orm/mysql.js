var models = require('../config/config');
var mysql = require('mysql');

// 连接数据库
// var conn = mysql.createConnection(models.mysql);
// conn.connect();

var pool = mysql.createPool(models.mysql);

var query=function(sql,callback){
  pool.getConnection(function(err,conn){
    if(err){
      callback(err,null,null);
    }else{
      conn.query(sql,function(err,results,fields){
        //释放连接
        conn.release();
        //事件驱动回调
        callback(err,results,fields);
      });
    }
  });
};

module.exports=query;
