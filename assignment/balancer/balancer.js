var express = require('express');
var app = express();
var request= require('request');
var fs=require('fs');
var i=-1;
app.get("/*",function(req,res){
  i=i+1;
  var p=fs.readFileSync(__dirname+"/list.txt").toString();
  var proxy=p.split("\n");
  var length=proxy.length;
  for(var k=0;k<length-1;k++)
  {
    proxy[k]=proxy[k]+"/cache?key=";
  }
  if(i==length-1)
  {
    i=0;
  }
  proxy[i]=proxy[i]+req.url;
  request(proxy[i],function(error,response,body){
    res.send(body);
  });
});

app.listen(4000,function(){
  console.log("listening to port 4000");
})
