let query = require('./mysql');
let Q = require('q');

module.exports = {
  pageExecute:function(param, max=999){
    let _this = this;

    let select_s = "SELECT *";
    select_s = param["SELECT"]?"SELECT "+param["SELECT"] : select_s;

    let from_s = "";
    from_s = param["FROM"]?"FROM "+param["FROM"] : from_s;

    let where_s = "WHERE 1=1";
    where_s = param["WHERE"]?"WHERE "+param["WHERE"] : where_s;

    let order_s = "";
    let order = param["ORDERBY"]?param["ORDERBY"]:param["ORDER"];
    order_s = order?"ORDER BY "+order : order_s;

    let group_s = "";
    let group = param["GROUPBY"]?param["GROUPBY"]:param["GROUP"];
    group_s = group?"GROUP BY "+group : group_s;

    let paramageNumber=param["pageNumber"];
    let paramageSize=param["pageSize"];
    let binding=param["binding"];

    let limit_s ="";
    if (paramageNumber > 0 && paramageSize > 0){
      let limit_start = (paramageNumber - 1) * paramageSize;
      limit_s =` LIMIT ${limit_start},${paramageSize}`;
    }else{
      let limit=param["LIMIT"];
      if(limit>0){
        limit_s =` LIMIT ${limit}`;
      }else{
        //SafeNet
        limit_s =` LIMIT ${max}`;
      }
    }
    let sql=`${select_s} ${from_s} ${where_s} ${group_s} ${order_s} ${limit_s}`;
    let rst = {};
    rst.sql=sql;

    if(binding){
      rst.binding=binding;
    }
    let defer = Q.defer();
    //console.log('第一条sql',sql);
    query(sql,function(err,result){
      //console.log('第一个Result',err,result);
      if (err){
        defer.reject(new Error(err));
      }else{
        rst.rows = result;
        rst.total = result.length;

        if (paramageNumber > 0 && paramageSize > 0 && max>0){
          let sql = `SELECT COUNT(*) AS total ${from_s} ${where_s} ${group_s}`;
          query(sql,function(err,result){
            //console.log('第二条sql结果',result);
            if (err){
              defer.reject(new Error(err));
            } else{
              //let total = rst.rows[0]["total"];
              // rst.maxRowCount=total;
              rst.total=result[0].total;
              defer.resolve(rst);
            }
          })
        }else{
          //约定如果第二参数为负数，跳过取总这一步.
          defer.resolve(rst);
        }
      }
    })
    return defer.promise;
  }
}
