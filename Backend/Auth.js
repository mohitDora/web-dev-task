const jwt=require("jsonwebtoken");


const Auth=(req,res,next)=>{
    const token=req.cookies.jwt;
    if(token){
        jwt.verify(token,"regret",(err,decodedtoken)=>{
            if(err){
                console.log(err.message);
             
                res.status(401).send("Unauthorized token provided")
            }
            else{
                console.log(decodedtoken);
              
                res.status(200).json("Unauthorized token provided")
                next();
            }
        })
    }
    else{
        res.status(401).send("Unauthorized token provided")
    }
}

module.exports={Auth}