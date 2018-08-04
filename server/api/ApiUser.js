var express = require('express');
var router = express.Router();
const sha1 = require('sha1')
let OrmUser = require('../orm/OrmUser');

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

// 增加用户接口
router.post('/addUser',OrmUser.CheckSession,(req, res) => {
  var params = req.body;
  // console.log(params);
  query('insert into user(id, name, age) values (0, ?, ?)', [params.username, params.age], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

router.post('/Login',(req,res)=>{
    //console.log('req',req.body);
    let params = req.body;
    params.password=sha1(params.password);//加密password
    OrmUser.Login(params).then(rst=>{
      req.session.user = rst.user;
      res.json(rst);
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
