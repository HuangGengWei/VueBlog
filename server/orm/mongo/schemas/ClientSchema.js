var mongoose = require('mongoose')

// 申明一个mongoons对象
var ClientSchema = new mongoose.Schema({
  ip: {type: 'string', required: true},
  create_time: {type: 'string', required: true},
  update_time: {type: 'string'},
  pv: {type: 'number', default: 0},
  location: {type: 'string'},
  isp: {type: 'string'},
  meta: {
    create_time: {
      type: Date,
      default: Date.now
    },
    update_time: {
      type: Date,
      default: Date.now
    }
  }
})

// 每次执行都会调用,时间更新操作
ClientSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.create_time = this.meta.update_time = Date.now
  } else {
    this.meta.update_time = Date.now
  }
  next()
})
// 暴露出去的方法
module.exports = ClientSchema
