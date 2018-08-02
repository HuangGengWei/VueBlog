let query = require('./mysql');
let Q = require('q');
let OrmBase = require('./OrmBase');
const moment = require('moment-timezone');//for datetime
//moment.tz.setDefault("Asia/Hong_Kong");

module.exports = {
  T_NAME:'b_blog',
  AddBlog:function(params){
    //console.log('AddBlog',params);
    let defer = Q.defer();
    let sql = 'INSERT INTO '+this.T_NAME+' (b_title,b_content,b_author,b_pv,b_comment,create_time,status) VALUES ("'+params.title+'","'+this.htmlspecialchars(params.content)+'","hwg","0","0",NOW(),"1");';
    //console.log('sql',sql);
    query(sql,function(err,rst){
      //console.log('插入数据返回结果',rst);
      if (err){
        defer.reject(new Error(err));
      }else{
        if (rst && rst.insertId>=1){
          defer.resolve({'STS':'OK'});
        }else{
          defer.resolve({'STS':'KO','errmsg':'发布失败'});
        }
      }
    });
    return defer.promise;
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
    let defer = Q.defer();
    let sql = 'UPDATE '+this.T_NAME+' SET b_title="'+params.title+'",b_content="'+this.htmlspecialchars(params.content)+'",update_time=NOW() WHERE id='+params.id+';';
    //console.log('sql',sql);
    query(sql,function(err,rst){
      //console.log('更新数据返回结果',rst);
      if (err){
        defer.reject(new Error(err));
      }else{
        if (rst && rst.affectedRows>=1){
          defer.resolve({'STS':'OK'});
        }else{
          defer.resolve({'STS':'KO','errmsg':'更新失败'});
        }
      }
    });
    return defer.promise;
  },
  DeleteBlog:function(params){
    //console.log('DeleteBlog',params);
    let defer = Q.defer();
    query('UPDATE '+this.T_NAME+' SET status=0,update_time=NOW() WHERE id='+params.id+';',function(err,rst){
      //console.log('更新数据返回结果',rst);
      if (err){
        defer.reject(new Error(err));
      }else{
        if (rst && rst.affectedRows>=1){
          defer.resolve({'STS':'OK'});
        }else{
          defer.resolve({'STS':'KO','errmsg':'删除失败'});
        }
      }
    });
    return defer.promise;
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
      //console.log('rst',rst);
      for (let i in rst.rows){
        //rst.rows[i].b_content = this.htmlspecialchars_decode(rst.rows[i].b_content);
        rst.rows[i].create_time = this.getTimeStr(rst.rows[i].create_time);
      }
      return rst;
    })
  },
  Blog:function(params){
    let defer = Q.defer();
    query('SELECT * FROM '+this.T_NAME+' WHERE id='+params.id+';',function(err,rst){
      console.log('BLOG',rst);
      if (err){
        defer.reject(new Error(err));
      }else{
        if (rst && rst.length>=1){
          defer.resolve({'STS':'OK','data':rst});
        }else{
          defer.resolve({'STS':'KO','errmsg':'获取不到内容！'});
        }
      }
    });
    return defer.promise;
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
