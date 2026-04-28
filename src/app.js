const express=require("express");

const app=express();

app.use("/test",(req,res)=>{
    res.send("hello from the server for /test!")
})
app.use("/hello",(req,res)=>{
    res.send("hello from the server from /hello!")
})

app.listen(3000, ()=>{
    console.log("server is sucessfully listening on port 3000")
});