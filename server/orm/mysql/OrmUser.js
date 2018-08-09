let query = require('./mysql');

module.exports={
  T_NAME:'b_user',
  Login:function(param){
    return query('SELECT * FROM '+this.T_NAME+' WHERE u_name="'+param.name+'" AND u_password="'+param.password+'";').then(rst=>{
      if (rst.err){
        return {'STS':'KO','errmsg':rst.err};
      }else{
        if (rst.rows && rst.rows.length>=1){
          return {'STS':'OK','user':rst.rows[0].u_name}
        }else{
          return {'STS':'KO','errmsg':'账号或者密码错误'};
        }
      }
    });
  },
  CheckSession:function(req,res,next){
    if (!req.session.user) {
      res.json({'STS':'KO','errcode':444});
    }else{
      next()
    }
  }
}
