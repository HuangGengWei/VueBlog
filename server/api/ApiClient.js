var express = require('express');
var router = express.Router();
let OrmClient = require('../orm/mongo/models/ClientModel');
let ToolFunction = require('../tool/ToolFunction');

router.post('/AddClientIP',(req,res)=>{
  //执行记录ip的代码-----------------------------------------------------------------------------
  let ip = OrmClient.getClientIP(req);
  if (ip!='127.0.0.1'){
    OrmClient.checkExist(ip).then(rst=>{
      if (rst.STS=='KO') {
        OrmClient.getIpInfo(ip).then(rst=>{
          if (rst.STS=='OK'){
            let ipinfo = rst.data;
            let {ip,country,region,city,isp} = ipinfo;
            OrmClient.AddClientIP({
              'ip':ip,
              'location':country+region+city,
              'pv':1,
              'isp':isp,
              'create_time':ToolFunction.CreateTime()
            }).then(rst=>{
                res.json(rst);
            });
          }
        });
      }else if (rst.STS=='OK'){
        OrmClient.updateIpInfo({'id':rst.id,'update_time':ToolFunction.CreateTime()})
        .then(rst=>{
          res.json(rst);
        })
      }
    })
  }else{
    console.log('本地地址[127.0.0.1]不做记录操作！！！');
  }
})
module.exports = router;
