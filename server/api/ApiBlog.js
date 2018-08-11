var express = require('express');
var router = express.Router();

// let OrmBlog = require('../orm/mysql/OrmBlog');
// let OrmUser = require('../orm/mysql/OrmUser');
let OrmBlog = require('../orm/mongo/models/BlogModel');
let OrmUser = require('../orm/mongo/models/UsersModel');//导入模型数据模块

let ToolFunction = require('../tool/ToolFunction');


//添加一篇博客
router.post('/AddBlog',OrmUser.CheckSession,(req,res)=>{
  let params = req.body;
  params.author = req.session.user
  params.create_time = ToolFunction.CreateTime();
  OrmBlog.AddBlog(params).then(rst=>{
      res.json(rst);
  })
})

//根据ID更新博客
router.post('/UpdateBlog',OrmUser.CheckSession,function(req,res){
  let params = req.body;
  params.update_time = ToolFunction.CreateTime();
  OrmBlog.UpdateBlog(params).then(rst=>{
      res.json(rst)
  })
})

//根据ID删除博客
router.post('/DeleteBlog',OrmUser.CheckSession,function(req,res){
  let params = req.body;
  params.update_time = ToolFunction.CreateTime();
  OrmBlog.DeleteBlog(params).then(rst=>{
    res.json(rst);
  })
})

//展示所有
router.post('/ShowAllBlog',OrmUser.CheckSession,(req,res)=>{
  let param = req.body;
  OrmBlog.ShowAllBlog(param).then(rst=>{
    res.json(rst);
  });
})

router.post('/BlogList',(req,res)=>{
  let param = req.body;
  OrmBlog.BlogList(param).then(rst=>{
    res.json(rst);
  })
})

//博客详情
router.post('/Blog',(req,res)=>{
  let param = req.body;
  OrmBlog.Blog(param).then(rst=>{
    res.json(rst);
  })
})

router.post('/BlogTotal',(req,res)=>{
  OrmBlog.BlogTotal().then(rst=>{
    res.json(rst);
  })
})



module.exports = router;
