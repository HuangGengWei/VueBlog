var mongoose = require('mongoose')
var BaseSchema = require('../schemas/Base') // 拿到导出的数据集模块
var BaseModel = mongoose.model('Users', BaseSchema) // 编译生成Movie 模型

module.exports = BaseModel
