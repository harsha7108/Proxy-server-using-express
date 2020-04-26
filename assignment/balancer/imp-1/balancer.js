var express = require('express');
var app = express();
var request= require('request');
var fs=require('fs');
var i=0;
app.use(function(req,res,next)
{
  init=Date.now()
  res.on('finish',function(){
    console.log('done',req.url,req.method,Date.now()-init);
  })
  next()
})

app.get("/*",function(req,res){
  var p=fs.readFileSync(__dirname+"/list.txt").toString();
  var proxy=p.split("\n");
  var length=proxy.length;
  
  for(var k=0;k<length-1;k++)
  {
    proxy[k]=proxy[k]+"/cache?key=";
  }
  proxy[i]=proxy[i]+req.url;
  request(proxy[i],function(error,response,body){

    if(error)
    {
      res.send("There was an error");
    }
    else {
      res.send(body);
    }

  });
  i=(i+1)%(length-1);
});

app.listen(4000,function(){
  console.log("listening to port 4000");
})
