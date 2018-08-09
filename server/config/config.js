// 数据库连接配置
module.exports = {
  mysql: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog',
    port: 3306
  },
  //后端服务器端点配置
  port: 3000,
  //mongourl: 'mongodb://120.78.66.123:27017/myblog',
  mongourl: 'mongodb://127.0.0.1:27017/blog',
}
