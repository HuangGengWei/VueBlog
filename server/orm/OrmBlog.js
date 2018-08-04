let query = require('./mysql');
let OrmBase = require('./OrmBase');
const moment = require('moment-timezone');//for datetime
//moment.tz.setDefault("Asia/Hong_Kong");

module.exports = {
  T_NAME:'b_blog',
  Test:function(){
    return {'STS':'OK','message':'成功连接'};
  },
  AddBlog:function(params){
    //console.log('AddBlog',params);
    let sql = 'INSERT INTO '+this.T_NAME+' (b_title,b_content,b_author,b_pv,b_comment,create_time,status) VALUES ("'+params.title+'","'+this.htmlspecialchars(params.content)+'","hwg","0","0",NOW(),"1");';
    //console.log('sql',sql);
    return query(sql).then(rst=>{
      //console.log('插入数据返回结果',rst);
      if (rst.err){
        return {'STS':'KO','errmsg':'rst.err'};
      }else{
        if (rst.rows && rst.rows.insertId>=1){
          return {'STS':'OK'};
        }else{
          return {'STS':'KO','errmsg':'发布失败'};
        }
      }
    });
  },
  ShowAllBlog:function(params){
    let param = {
      'FROM':this.T_NAME,
      'pageNumber':params.pageNumber,
      'pageSize':params.pageSize,
      'WHERE':' status=1 ',
    }
    return OrmBase.pageExecute(param).then(rst=>{
      //console.log('rst',rst);
      for (let i in rst.rows){
        rst.rows[i].b_content = this.htmlspecialchars_decode(rst.rows[i].b_content);
        rst.rows[i].create_time = this.getTimeStr(rst.rows[i].create_time);
      }
      return rst;
    })
  },
  UpdateBlog:function(params){
    //console.log('UpdateBlog',params);
    let sql = 'UPDATE '+this.T_NAME+' SET b_title="'+params.title+'",b_content="'+this.htmlspecialchars(params.content)+'",update_time=NOW() WHERE id='+params.id+';';
    //console.log('sql',sql);
    return query(sql).then(rst=>{
      //console.log('更新数据返回结果',rst);
      if (rst.err){
        return {'STS':'KO','errmsg':rst.err};
      }else{
        if (rst.rows && rst.rows.affectedRows>=1){
          return {'STS':'OK'};
        }else{
          return {'STS':'KO','errmsg':'更新失败'};
        }
      }
    });
  },
  DeleteBlog:function(params){
    //console.log('DeleteBlog',params);
    return query('UPDATE '+this.T_NAME+' SET status=0,update_time=NOW() WHERE id='+params.id+';').then(rst=>{
      //console.log('更新数据返回结果',rst);
      if (rst.err){
        return {'STS':'KO','errmsg':rst.err};
      }else{
        if (rst.rows && rst.rows.affectedRows>=1){
          return {'STS':'OK'};
        }else{
          return {'STS':'KO','errmsg':'删除失败'};
        }
      }
    });
  },
  BlogList:function(params){
    let param = {
      'SELECT':' id,b_title,create_time ',
      'FROM':this.T_NAME,
      'pageNumber':params.pageNumber,
      'pageSize':params.pageSize,
      'WHERE':' status=1 ',
    }
    return OrmBase.pageExecute(param).then(rst=>{
      for (let i in rst.rows){
        //rst.rows[i].b_content = this.htmlspecialchars_decode(rst.rows[i].b_content);
        rst.rows[i].create_time = this.getTimeStr(rst.rows[i].create_time);
      }
      return rst;
    }).catch(function (err) {console.log(err);});
  },
  Blog:function(params){
    //console.log('params',params);
    return query('SELECT * FROM '+this.T_NAME+' WHERE '+params.id+';').then(rst=>{
      if (rst.err){
        return {'STS':'KO','errmsg':rst.err};
      }
      return {'STS':'OK','data':rst.rows};
    });
  },
  htmlspecialchars:function(str){
    // str = str.replace(/&/g, '&amp;');
    // str = str.replace(/</g, '&lt;');
    // str = str.replace(/>/g, '&gt;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/'/g, '&#039;');
    return str;
  },
  htmlspecialchars_decode:function(str){
    // str = str.replace(/&amp;/g, '&');
    // str = str.replace(/&lt;/g, '<');
    // str = str.replace(/&gt;/g, '>');
    str = str.replace(/&quot;/g, '"');
    str = str.replace(/&#039;/g, "'");
    return str;
  },
  getTimeStr:function(dt,fmt){
    if(!dt)dt=new Date();
    if(!fmt)fmt='YYYY-MM-DD HH:mm:ss';
    return moment(dt).format(fmt);
  }
}
