const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const config = require('./config/config');

//session
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); //这个表示任意域名都可以访问，这样写不能携带cookie了。
  res.header('Access-Control-Allow-Credentials', true); // 允许服务器端发送Cookie数据
//res.header('Access-Control-Allow-Origin', 'www.baidu.com'); //这样写，只有www.baidu.com 可以访问。
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');//设置方法
  if (req.method == 'OPTIONS') {
    res.send(200); // 意思是，在正常的请求之前，会发送一个验证，是否可以请求。
  }
  else {
    next();
  }
});

app.use(cookieParser());
app.use(session({
  secret: '12345',
  name: 'blogSession',//这里的name值得是cookie的name，默认cookie的name是：connect.sid
  cookie: {maxAge: 3600000 },//设置maxAge是1小时，即1小时后session和相应的cookie失效过期
  resave: false,
  saveUninitialized: true,
}));

// node 后端服务器
const ApiUser = require('./api/ApiUser');
const ApiBlog = require('./api/ApiBlog');
// 后端api路由
app.use('/api/ApiUser',ApiUser);
app.use('/api/ApiBlog',ApiBlog);

// 监听端口
app.listen(config.port);
console.log('success listen at port:'+config.port);
