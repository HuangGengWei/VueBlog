var express = require('express');
var router = express.Router();

// let OrmBlog = require('../orm/mysql/OrmBlog');
// let OrmUser = require('../orm/mysql/OrmUser');
let OrmBlog = require('../orm/mongo/models/BlogModel');
let OrmUser = require('../orm/mongo/models/UsersModel');//导入模型数据模块


router.post('/AddBlog',OrmUser.CheckSession,(req,res)=>{
  let params = req.body;
  params.author = req.session.user
  OrmBlog.AddBlog(params).then(rst=>{
      res.json(rst);
  });
})

router.post('/UpdateBlog',OrmUser.CheckSession,function(req,res){
  let params = req.body;
  OrmBlog.UpdateBlog(params).then(rst=>{
      res.json(rst)
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
  let params = req.body;
  OrmBlog.Blog(params).then(rst=>{
    res.json(rst);
  })
})

router.post('/BlogTotal',(req,res)=>{
  OrmBlog.BlogTotal().then(rst=>{
    res.json(rst);
  })
})



module.exports = router;
