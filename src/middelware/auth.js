const adminAuth=(req,res,next)=>{
    console.log("admin auth is getting checked")
     const token="dcg"
const isAdminAuth=token==="dcg"; //this give true or false in isAdminAuth
     if(!isAdminAuth){
        res.status(401).send("unauthorized user")
     }
     else{
        next();
     }
}

const userAuth=(req,res,next)=>{
    console.log("admin auth is getting checked")
     const token="dcg"
const isAdminAuth=token==="dcg"; //this give true or false in isAdminAuth
     if(!isAdminAuth){
        res.status(401).send("unauthorized user")
     }
     else{
        next();
     }
}

module.exports={adminAuth,userAuth}