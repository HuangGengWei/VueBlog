let query = require('./mysql');

module.exports = {
  pageExecute:function(param, max=999){
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
    //console.log('第一条sql',sql);
    return query(sql).then(result=>{
      if(result.err){
        return {'STS':'KO','errmsg':result.err};
      }
      rst.rows = result.rows;
      rst.total = result.rows.length;
      let sql2 = `SELECT COUNT(*) AS total ${from_s} ${where_s} ${group_s}`;
      return query(sql2);
    }).then(result=>{
      if (result.err){
        return {'STS':'KO','errmsg':result.err};
      }
      rst.total=result.rows[0].total;
      return rst;
    })
  }
}
