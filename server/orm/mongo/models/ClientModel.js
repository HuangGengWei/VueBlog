let mongoose = require('mongoose')
let ClientSchema = require('../schemas/ClientSchema') //拿到导出的数据集模块
let ClientModel = mongoose.model('Visitor', ClientSchema) // 编译生成Movie 模型
let http = require('http');
let Q = require('q');

module.exports = {

  getClientIP:function(req){
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress || '';
    ip=ip.match(/\d+.\d+.\d+.\d+/);
    ip = ip ? ip.join('.') : null;
    return ip;
  },

  getIpInfo:function(ip){
    var sina_server = 'http://ip.taobao.com/service/getIpInfo.php?ip=';
    var url = sina_server + ip;
    //let url = 'http://pv.sohu.com/cityjson?ie=utf-8';
    //let url ='http://ip.taobao.com/service/getIpInfo.php?ip=120.78.66.123';
    var deferred = Q.defer();
    http.get(url, function(res) {
      var code = res.statusCode;
      if (code == 200) {
        res.on('data', function(rst) {
          rst = JSON.parse(rst);
          if (rst.code==0){
            let data = rst.data;
            deferred.resolve({'STS':'OK','data':data});
          }else if (rst.code==1) {
            deferred.reject({'STS':'KO'});
          }
        });
      } else {
        deferred.reject({'STS':'KO','errmsg':'Error! http return code is '+code});
      }
    }).on('error', function(e) {
      deferred.reject({'STS':'KO','errmsg':e});
    });
    return deferred.promise; // 这里返回一个承诺
  },

  AddClientIP:function(param){
    return ClientModel
      .create(param)
      .then(rst=>{
        if (rst._id){
          return {'STS':'OK'};
        }else{
          return {'STS':'KO','errmsg':'添加访客记录失败'};
        }
      }).catch(err=>{
        return {'STS':'KO','errmsg':err.message}
      });
  }
}
