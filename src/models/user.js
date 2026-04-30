const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20,
    },
    lastName:{
        type:String
    },
    emailID:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        match:[/^\S+@\S+.\S+$/,"please use a valid email address"]
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18,
        max:90
    },
    gender:{
        type:String,
       validate(value){
        if(value !== "male" && value !== "female" && value !== "other"){
             throw new Error ("gender is not valid")
        }
       }
    },
    photoURL:{
        type:String,
        default:"https://hancockogundiyapartners.com/wp-content/uploads/2019/07/dummy-profile-pic-300x300.jpg"
    },
    about:{
        type:String,
        default:"this is a default about of the user!",
    },
    skills:{
        type:[String],
    }
    
},{
    timestamps:true,
})

const User=mongoose.model("User",userSchema)
module.exports={User}