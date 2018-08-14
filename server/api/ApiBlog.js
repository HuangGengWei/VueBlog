var express = require('express');
var router = express.Router();

// let OrmBlog = require('../orm/mysql/OrmBlog');
// let OrmUser = require('../orm/mysql/OrmUser');
let OrmBlog = require('../orm/mongo/models/BlogModel');
let OrmUser = require('../orm/mongo/models/UserModel');//导入模型数据模块
let OrmClient = require('../orm/mongo/models/ClientModel');

let ToolFunction = require('../tool/ToolFunction');


//添加一篇博客
router.post('/AddBlog',OrmUser.CheckSession,(req,res)=>{
  let param = req.body;
  param.author = req.session.user
  param.create_time = ToolFunction.CreateTime();
  OrmBlog.AddBlog(param).then(rst=>{
      res.json(rst);
  })
})

//根据ID更新博客
router.post('/UpdateBlog',OrmUser.CheckSession,function(req,res){
  let param = req.body;
  param.update_time = ToolFunction.CreateTime();
  OrmBlog.UpdateBlog(param).then(rst=>{
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

  //执行记录ip的代码-----------------------------------------------------------------------------
  let ip = OrmClient.getClientIP(req);
  //console.log(ip);
  if (ip!='127.0.0.1'){
    OrmClient.getIpInfo(ip).then(rst=>{
      //console.log('rst',rst);
      if (rst.STS=='OK'){
        let ipinfo = rst.data;
        let {ip,country,region,city,isp} = ipinfo;
        OrmClient.AddClientIP({
          'ip':ip,
          'location':country+region+city,
          'isp':isp,
          'create_time':ToolFunction.CreateTime()
        });
      }
    });
  }

  //执行返回博客列表
  OrmBlog.BlogList(param).then(rst=>{
    res.json(rst);
  })
})

//博客详情
router.post('/Blog',(req,res)=>{
  let param = req.body;
  // console.log('param',param);
  OrmBlog.AccumulateOnePV(param).then(rst=>{
    // 不管pv加一成功与否都返回博客文章详情
    OrmBlog.Blog(param).then(rst=>{
      res.json(rst);
    })
  })
})

router.post('/BlogTotal',(req,res)=>{
  OrmBlog.BlogTotal().then(rst=>{
    res.json(rst);
  })
})



module.exports = router;
