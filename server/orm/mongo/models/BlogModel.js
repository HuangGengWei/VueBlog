var mongoose = require('mongoose')
var BlogSchema = require('../schemas/BlogSchema') // 拿到导出的数据集模块
var BlogModel = mongoose.model('Blog', BlogSchema) // 编译生成Movie 模型
module.exports = {

  fetch: function () { // 查询所有数据
    return BlogModel
      .find()
      .sort('meta.update_time') // 排序
      .exec()// 回调
  },

  findById: function (id) { // 根据id查询单条数据
    return BlogModel
      .findOne({_id: id})
      .exec()
  },

  AddBlog: function (param) {
    return BlogModel
      .create(param).then(rst => {
        if (rst._id) {
          return {'STS': 'OK'}
        } else {
          return {'STS': 'KO', 'errmsg': '发布文章失败'}
        }
      }).catch(err => {
        return {'STS': 'KO', 'errmsg': err.message}
      })
  },

  UpdateBlog: function (param) {
    let {id, title, content, source, update_time} = param
    return BlogModel.update({ _id: id }, { $set: { title: title, content: content, source: source, update_time: update_time } }).exec().then(rst => {
      if (rst.ok == 1 && rst.nModified >= 1) {
        return {'STS': 'OK'}
      } else {
        return {'STS': 'KO', 'errmsg': '无任何改动'}
      }
    }).catch(err => {
      return {'STS': 'KO', 'errmsg': err.message}
    })
  },

  DeleteBlog: function (param) {
    let {id} = param
    return BlogModel
      .update({_id: id}, {$set: {status: -1}})
      .exec()
      .then(rst => {
        if (rst.ok === 1 && rst.nModified === 1) {
          return {'STS': 'OK'}
        } else {
          return {'STS': 'KO', 'errmsg': '删除博客失败'}
        }
      }).catch(err => {
        return {'STS': 'KO', 'errmsg': err.message}
      })
  },

  ShowAllBlog: function (param) {
    var {And, Or, startDay, endDay} = param
    let pageNumber = parseInt(param.pageNumber)
    let skip = 0
    if (pageNumber > 1) { skip = (param.pageNumber - 1) * 10 };
    let pageSize = parseInt(param.pageSize)
    let data = ''
    let P = {}
    P.status = 1
    for (var i in And) {
      P[And[i].key] = new RegExp(And[i].value)
    }
    if (Or.length > 0) {
      P['$or'] = []
      for (let i in Or) {
        let Por = {}
        Por[Or[i].key] = new RegExp(Or[i].value)
        P['$or'].push(Por)
      }
    }
    if (startDay || endDay) {
      P['create_time'] = {}
      if (startDay) {
        P['create_time']['$gt'] = startDay + ' 00:00:00'
      }
      if (endDay) {
        P['create_time']['$lt'] = endDay + ' 23:59:59'
      }
    }
    // console.log('P',P);
    return BlogModel
      .find(P, { _id: 1, title: 1, create_time: 1, author: 1, comment: 1, pv: 1, update_time: 1 })
      .sort({'meta.create_time': -1}) // 排序
      .skip(skip)
      .limit(pageSize)
      .exec()
      .then(rst => {
        // console.log('ShowAllBlog',rst);
        if (rst) {
          data = {'STS': 'OK', 'rows': rst}
        }
        return BlogModel.find(P).countDocuments()
      }).then(total => {
        data.total = total
        return data
      }).catch(err => {
        return {'STS': 'KO', 'errmsg': err.message}
      })
  },

  BlogList: function (param) {
    let pageNumber = parseInt(param.pageNumber)
    let skip = 0
    if (pageNumber > 1) { skip = (pageNumber - 1) * 10 };
    let pageSize = parseInt(param.pageSize)
    return BlogModel
      .find({status: 1}, { _id: 1, title: 1, source: 1, create_time: 1 })
      .sort({'meta.create_time': -1}) // 排序
      .skip(skip)
      .limit(pageSize)
      .exec()
      .then(rst => {
        if (rst) {
          return {'STS': 'OK', 'rows': rst, 'total': rst.length}
        }
      }).catch(err => {
        return {'STS': 'KO', 'errmsg': err.message}
      })
  },

  Blog: function (param) {
    let {id} = param
    return BlogModel
      .find({_id: id, status: 1})
      // .populate('commentId')//注意这是联合查询的关键
      .exec()
      .then(rst => {
        if (rst) {
          return {'STS': 'OK', 'row': rst, 'total': rst.length}
        } else {
          return {'STS': 'KO', 'errmsg': '获取博客详情失败'}
        }
      }).catch(err => {
        return {'STS': 'KO', 'errmsg': err.message}
      })
  },

  BlogTotal: function () {
    return BlogModel
      .find({status: 1})
      .countDocuments()
      .then(total => {
        return {'STS': 'OK', 'total': total}
      }).catch(err => {
        return {'STS': 'KO', 'errmsg': err.message}
      })
  },

  AccumulateOnePV: function (param) {
    let {id} = param
    return BlogModel
      .update({ _id: id }, {'$inc': {'pv': 1}})
      .then(rst => {
        if (rst.ok === 1 && rst.nModified >= 1) {
          return {'STS': 'OK'}
        } else {
          return {'STS': 'KO', 'errmsg': '无任何改动'}
        }
      })
      .catch(err => {
        return {'STS': 'KO', 'errmsg': err.message}
      })
  },

  UpdateCommentCount: function (param) {
    let {id, comment} = param
    return BlogModel.update({ _id: id }, {$set: {comment: comment}}).exec().then(rst => {
      if (rst.ok == 1 && rst.nModified >= 1) {
        return {'STS': 'OK'}
      } else {
        return {'STS': 'KO', 'errmsg': '无任何改动'}
      }
    }).catch(err => {
      return {'STS': 'KO', 'errmsg': err.message}
    })
  }

}

// module.exports = BlogModel
