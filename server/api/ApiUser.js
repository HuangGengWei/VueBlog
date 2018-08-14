var express = require('express');
var router = express.Router();
const sha1 = require('sha1')

// let OrmUser = require('../orm/mysql/OrmUser');
let OrmUser = require('../orm/mongo/models/UserModel');//导入模型数据模块

let ToolFunction = require('../tool/ToolFunction');

var jsonWrite = function(res, ret) {
  if(typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};

router.post('/Signup',(req,res)=>{
  let params = req.body;
  params.password=sha1(params.password);//加密password
  params.create_time = ToolFunction.CreateTime();
  OrmUser.Signup(params).then(rst=>{
    console.log('rst',rst);
    res.json(rst);
  })
})

router.post('/Login',(req,res)=>{
    let params = req.body;
    params.password=sha1(params.password);//加密password
    OrmUser.Login(params).then(rst=>{
      if (rst){
        req.session.user = rst.name;
        res.json({'STS':'OK'});
      }else{
        res.json({'STS':'KO'});
      }
    });
})

router.post('/CheckLogin',OrmUser.CheckSession,(req,res)=>{
  res.json({'STS':'OK'});
})

router.post('/LoginOut',(req,res)=>{
  delete req.session.user;
  res.json({'STS':'OK'});
})

module.exports = router;
