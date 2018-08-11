var mongoose = require('mongoose');

//申明一个mongoons对象
var UsersSchema = new mongoose.Schema({
  name: { type: 'string', required: true },
  password:{ type: 'string', required: true },
  status: {type:'number',default:1},
  create_time:{type:'string',required:true},
  update_time:{type:'string'},
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
});
UsersSchema.set('toJSON', { getters: true});
//每次执行都会调用,时间更新操作
UsersSchema.pre('save', function(next) {
  if(this.isNew) {
    this.meta.create_time = this.meta.update_time = Date.now;
  }else {
    this.meta.update_time = Date.now;
  }
  next();
})

//暴露出去的方法
module.exports = UsersSchema
