const validator=require("validator")
const validateSignUpData=(req)=>{
    const {firstName,lastName,emailID,password}=req.body
    if(!firstName||!lastName){
       throw new Error("name is not valid")
    }
    if(!validator.isEmail(emailID)){
        throw new Error("email id is not correct")
    }
}

// even though all these validation also checked from 
// schema but u can also write here 

module.exports={
validateSignUpData
}