var express = require('express');
var app = express();
var request= require('request');
var fs=require('fs');
var prompt = require('prompt-sync')({sigint: true});
var weight=Array();
var count=Array();
var i=0;
var flag=0;
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
  ++count[i];
  if(flag==0)
  {
    init_weights();
    flag=-1;
  }
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

  })
  if(weight[i]==count[i])
  {
    i=(i+1)%(length-1);
  }
})
var init_weights=function(){
  var p=fs.readFileSync(__dirname+"/list.txt").toString();
  var proxy=p.split("\n");
  var length=proxy.length;
  for(var j=0;j<length-1;j++)
  {
    weight[j]=prompt('what weight do you want to assign to server'+(j+1)+' ');
  }
}
app.listen(4000,function(){
  console.log("listening to port 4000");
  var p=fs.readFileSync(__dirname+"/list.txt").toString();
  var proxy=p.split("\n");
  var length=proxy.length;
  for(var t=0;t<length-1;t++)
  {
    count[t]=0;
  }
})
