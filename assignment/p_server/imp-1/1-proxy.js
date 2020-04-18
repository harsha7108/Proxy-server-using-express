var express=require('express');
var app=express();
var request=require('request');
var mcache=require('memory-cache');
var url='https://www.espncricinfo.com/';
var duration=30;

app.get("/cache",function(req,res){
  var key='__express__'+req.url;
  var c_data=mcache.get(key);
  if(c_data)
  {
    console.log("cache hit");
    res.status(200).send(c_data);
  }
  else {
    console.log("cache miss");
    request(url,function(error,response,body){
      mcache.put(key,body,duration*1000);
      res.send(body);
    })
  }
})

app.listen(3001,function(){
  console.log("listening to port 3001");
})
