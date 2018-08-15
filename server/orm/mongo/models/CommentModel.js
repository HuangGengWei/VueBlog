let mongoose = require('mongoose')
let CommentSchema = require('../schemas/CommentSchema') //拿到导出的数据集模块
let CommentModel = mongoose.model('Comment', CommentSchema) // 编译生成Movie 模型

module.exports = {
  AddComment:function(param){
    return CommentModel
      .create(param).then(rst=>{
      if (rst._id){
        return {'STS':'OK'};
      }else{
        return {'STS':'KO','errmsg':'发表评论失败'};
      }
    }).catch(err=>{
      return {'STS':'KO','errmsg':err.message}
    });
  },
  ShowComment:function(param){
    let {blogid} = param;
    return CommentModel
      .find({'blogid':blogid})
      .exec()
      .then(rst=>{
        if (rst){
          return {'STS':'OK','row':rst,'total':rst.length};
        }else{
          return {'STS':'KO','errmsg':'获取博客评论失败'};
        }
      }).catch(err=>{
        return {'STS':'KO','errmsg':err.message}
      });
  }
}
