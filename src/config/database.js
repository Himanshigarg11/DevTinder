const mongoose=require("mongoose");
async function connectDB(){
    const connection=await mongoose.connect(
    "mongodb+srv://himanshi15:uVSrdhZZGblYMIdS@cluster0.ttalr8b.mongodb.net/devTinder"
    )
}
module.exports={connectDB}





