const jwt=require("jsonwebtoken");
const JWT_SECRET="iamadevelkjvjhjvoperlearnkjgjhinghowtocode"

const fetchUser=(req,res,next)=>{
    const token=req.header("auth-token");
    if(!token){
        res.status(400).send({error:"Please authenticate with a valid token"});    
    }
    try{
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    }
    catch(error){
        res.status(401).send({error:"Please authenticate using a valid token"});
    }
}

module.exports=fetchUser;