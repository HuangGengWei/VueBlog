var mongoose = require('mongoose');

//申明一个mongoons对象
var BlogSchema = new mongoose.Schema({
  title: { type: 'string', required: true },
  content: {type:'string',required:true},
  author: {type:'string',required:true},
  comment: {type:'number',default:0},
  pv: {type:'number',default:0},
  source: {type:'number',default:0},
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
})

//每次执行都会调用,时间更新操作
BlogSchema.pre('save', function(next) {
  if(this.isNew) {
    this.meta.create_time = this.meta.update_time = Date.now;
  }else {
    this.meta.update_time = Date.now;
  }
  next();
})
//暴露出去的方法
module.exports = BlogSchema
