let query = require('./mysql');
let Q = require('q');

module.exports={
  T_NAME:'b_user',
  Login:function(param){
    //return {'STS':'OK'};
    let deferred = Q.defer();
    query('SELECT * FROM '+this.T_NAME+' WHERE u_name="'+param.name+'" AND u_password="'+param.password+'";',function(err, rst){
      console.log('rst',rst,'err',err);
      if (err){
        deferred.reject(new Error(err));
      }else{
        if (rst && rst.length>=1){
          deferred.resolve({'STS':'OK','user':rst[0].u_name});
        }else{
          deferred.resolve({'STS':'KO','errmsg':'账号或者密码错误'});
        }
      }
    });
    return deferred.promise;
  },
  CheckSession:function(req,res,next){
    if (!req.session.user) {
      res.json({'STS':'KO','errcode':444});
    }else{
      next()
    }
  }
}
