var express = require('express');
var router = express.Router();
let OrmClient = require('../orm/mongo/models/ClientModel');
let ToolFunction = require('../tool/ToolFunction');

router.post('/AddClientIP',(req,res)=>{
  //执行记录ip的代码-----------------------------------------------------------------------------
  let ip = OrmClient.getClientIP(req);
  //if (ip!='127.0.0.1'){
    OrmClient.getIpInfo('120.78.66.123').then(rst=>{
      //console.log('rst',rst);
      if (rst.STS=='OK'){
        let ipinfo = rst.data;
        let {ip,country,region,city,isp} = ipinfo;
        OrmClient.AddClientIP({
          'ip':ip,
          'location':country+region+city,
          'isp':isp,
          'create_time':ToolFunction.CreateTime()
        }).then(rst=>{
            res.json(rst);
        });
      }
    });
  //}
})
module.exports = router;
