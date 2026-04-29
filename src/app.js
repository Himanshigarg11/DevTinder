const express=require("express");
const {connectDB}=require("./config/database")
const app=express();
const {User}=require("./models/user")
app.post("/signup", async (req,res)=>{
 const user=new User({
        firstName:"jiyansh",
        lastName:"kalra",
        emailID:"jiyanshkalra@gmail.com",
        age:20,
        gender:"male"

 })
   try{
    await user.save();
   res.send("user added successfully")
   }
   catch(err){
    res.status(400).send("Error saving the user:"+err.message)
   }
})


connectDB()
.then(()=>{
    console.log("connection made successfully")
    app.listen(3000, ()=>{
    console.log("server is sucessfully listening on port 3000")
});
})
.catch(()=>{console.log("Something ERROR occured")}) 

