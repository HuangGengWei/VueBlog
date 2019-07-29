var mongoose = require('mongoose')
var UserSchema = require('../schemas/UserSchema') // 拿到导出的数据集模块
var UserModel = mongoose.model('Users', UserSchema) // 编译生成Movie 模型

module.exports = {
  fetch: function (cb) { // 查询所有数据
    return UserModel
      .find()
      .sort('meta.update_time') // 排序
      .exec(cb) // 回调
  },
  findById: function (id, cb) { // 根据id查询单条数据
    return UserModel
      .findOne({_id: id})
      .exec(cb)
  },
  Login: function (params) {
    var {name, password} = params
    return UserModel
      .findOne({name: name, password: password})
      .exec()
  },
  Signup: function (params) {
    // var {name,password}=params;
    return UserModel
      .create(params)
      .exec()
  },
  CheckSession: function (req, res, next) {
    if (!req.session.user) {
      res.json({'STS': 'KO', 'errcode': 444})
    } else {
      next()
    }
  }
}
// module.exports = UsersModel
