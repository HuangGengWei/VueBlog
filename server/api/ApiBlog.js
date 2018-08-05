var express = require('express');
var router = express.Router();
let OrmBlog = require('../orm/OrmBlog');
let OrmUser = require('../orm/OrmUser');

router.post('/Test',(req,res)=>{
  res.json(OrmBlog.Test());
})


var models = require('../config/config');
router.post('/TestMongodb',(req,res)=>{
  var MongoClient = require('mongodb').MongoClient;
  var url = models.mongodb;
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log('数据库已创建');
    var dbo = db.db("myblog");
    dbo.collection("posts"). find({}).toArray(function(err, result) { // 返回集合中所有数据
      if (err) throw err;
      console.log(result);
      res.json(result);
      db.close();
    });
  });
})

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
