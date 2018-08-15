var mongoose = require('mongoose');
//申明一个mongoons对象
var CommentSchema = new mongoose.Schema({
  blogid:{type:'string',required:true},
  comment:{type:'string',required:true},
  ip:{type:'string'},
  create_time:{type:'string',required:true},
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

//每次执行都会调用,时间更新操作
CommentSchema.pre('save', function(next) {
  if(this.isNew) {
    this.meta.create_time = this.meta.update_time = Date.now;
  }else {
    this.meta.update_time = Date.now;
  }
  next();
})
//暴露出去的方法
module.exports = CommentSchema;
