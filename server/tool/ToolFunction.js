//工具函数
let moment = require('moment');
module.exports = {
  //生成一个时间
  CreateTime:function(){
    return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  }
}
