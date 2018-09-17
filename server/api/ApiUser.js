var express = require('express');
var router = express.Router();
const sha1 = require('sha1');

const fs = require('fs');
const crypto = require('crypto');
var privatePem = fs.readFileSync('./pem/private.pem');

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
    
    // 解密
    var privateKey = fs.readFileSync('./pem/private.pem', 'utf8')
    var password = req.body.password
    var buffer2 = Buffer.from(password, 'base64');
    var decrypted = crypto.privateDecrypt({key: privateKey,padding: crypto.constants.RSA_PKCS1_PADDING},buffer2);// 注意这里的常量值要设置为RSA_PKCS1_PADDING
    //SERVER端解密后得到密码原文
    var decryptedPassWord=decrypted.toString('utf8');
    //console.log('SERVER端解密后得到密码原文',decryptedPassWord);
    
    //再用sha1加密成数据库
    params.password=sha1(decryptedPassWord);
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

router.post('/getPublicKey',(req,res)=>{
  // 不加会报错
  if (req.method === 'OPTIONS') {
    res.end('ok')
    return
  }

  let publicPem = fs.readFileSync('./pem/public.pem','utf-8');
  res.json(publicPem);
})

module.exports = router;
