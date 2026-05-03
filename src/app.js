const express=require("express");
const {connectDB}=require("./config/database")
const app=express();
const {User}=require("./models/user")
const {validateSignUpData}=require("./utils/validation")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const cookieParser=require("cookie-parser")
const {userAuth}=require("./middelware/auth")
app.use(cookieParser())
app.use(express.json())

// post /signup add user
app.post("/signup", async (req,res)=>{
     try{
    //validation of data 
     validateSignUpData(req);
    //encrption of data 
    const {password,firstName,lastName,emailID,age,gender,phoneNumber}=req.body
    const passwordHash=await bcrypt.hash(password,10)
    console.log(passwordHash)
    // creating instance of data 
     const user=new User({
        firstName,
        lastName,
        emailID,
        age,
        gender,
        phoneNumber,
        password:passwordHash,   
     })

    await user.save();
    res.send("user added successfully")
 }
 catch(err){
   res.status(400).send("ERROR: "+err.message)
 }

})

// post /login 
app.post("/login", async(req,res)=>{
    try{
      const {emailID,password}=req.body;
      const user=await User.findOne({emailID:emailID});
      if(!user){
        throw new Error("Invalid credentials")
      }
    const isPassword=await bcrypt.compare(password,user.password)
      if(isPassword){
        //create jwt token 
        const token=await jwt.sign(
            {userId:user._id},
            "devTinder@123$123",
            {expiresIn:"7d"})

        res.cookie("token",token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000)

        })
        // add with cookie send to user
        res.send("login successfully!!")
      }
      else{
         throw new Error("Invalid credentials")
      } 
    }
    catch(err){
        res.status(400).send("Error: "+err.message)
    }
})

// get /profile api
app.get("/profile",userAuth,async (req,res)=>{
    try{
      const user=req.user
      res.send(user)
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
})


// post api /sendConnectionRequest

app.post("/sendConnectionRequest",userAuth,async (req,res)=>{
    try{
      console.log("sending a connection request")
      res.send("connection request send")
    }
    catch(err){
        res.status(400).send("Error: "+err.message)
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

