const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const config = require('./config/config');

//session
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

//Node-RSA
const NodeRSA = require('node-rsa');
// Generate new 512bit-length key
var key = new NodeRSA({b: 512})
key.setOptions({encryptionScheme: 'pkcs1'})

var privatePem = key.exportKey('pkcs1-private-pem')
var publicDer = key.exportKey('pkcs8-public-der')
var publicDerStr = publicDer.toString('base64')

// 保存返回到前端的公钥
fs.writeFile('./pem/public.pem', publicDerStr, (err) => {
  if (err) throw err
  console.log('公钥已保存！')
})
// 保存私钥
fs.writeFile('./pem/private.pem', privatePem, (err) => {
  if (err) throw err
  console.log('私钥已保存！')
})


app.use(bodyParser.json({limit:'10mb'}));
app.use(bodyParser.urlencoded({limit:'10mb',extended: true}));

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
const ApiClient = require('./api/ApiClient');
// 后端api路由
app.use('/api/ApiUser',ApiUser);
app.use('/api/ApiBlog',ApiBlog);
app.use('/api/ApiClient',ApiClient);

var mongoose = require('mongoose');
mongoose.connect(config.mongourl,{ useNewUrlParser: true }) //连接数据库


const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`);
  // 衍生工作进程。
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`);
  });
} else {
  // 工作进程可以共享任何 TCP 连接。
  app.listen(config.port);
  console.log(`工作进程 ${process.pid} 已启动`);
}
 
//app.listen(config.port);
console.log('success listen at port:'+config.port);