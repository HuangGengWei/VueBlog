var express = require('express');
var router = express.Router();
let OrmBlog = require('../orm/OrmBlog');
let OrmUser = require('../orm/OrmUser');

router.post('/Test',(req,res)=>{
  res.json(OrmBlog.Test());
})

var models = require('../config/config');
var mysql = require('mysql');
router.post('/TestMySQL',(req,res)=>{
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
  res.json({'STS':'OK'});
});

router.post('/AddBlog',OrmUser.CheckSession,(req,res)=>{
  let params = req.body;
  OrmBlog.AddBlog(params).then(rst=>{
    //console.log(rst);
    rst.author = req.session.user;
    res.json(rst);
  });
})

router.post('/UpdateBlog',OrmUser.CheckSession,function(req,res){
  let params = req.body;
  OrmBlog.UpdateBlog(params).then(rst=>{
    res.json(rst);
  })
})

router.post('/DeleteBlog',OrmUser.CheckSession,function(req,res){
  let params = req.body;
  OrmBlog.DeleteBlog(params).then(rst=>{
    res.json(rst);
  })
})

router.post('/ShowAllBlog',OrmUser.CheckSession,(req,res)=>{
  let params = req.body;
  OrmBlog.ShowAllBlog(params).then(rst=>{
    //console.log(rst);
    res.json(rst);
  });
})

router.post('/BlogList',(req,res)=>{
  let params = req.body;
  OrmBlog.BlogList(params).then(rst=>{
    res.json(rst);
  })
})

router.post('/Blog',(req,res)=>{
  //console.log('req',req);
  let params = req.body;
  OrmBlog.Blog(params).then(rst=>{
    //console.log('rst',rst);
    for(let i in rst.data){
      rst.data[i].create_time=OrmBlog.getTimeStr(rst.data[i].create_time);
      rst.data[i].b_content = OrmBlog.htmlspecialchars_decode(rst.data[i].b_content);
    }
    res.json(rst);
  })
})

module.exports = router;
