let jwt = require('jsonwebtoken')

module.exports.verifyToken = async(req,res,next)=>{
    if(req.headers.authorization == undefined){
        res.json({status:401,message:"Unauthorized"})
    }
    const token =req.headers.authorization.split(" ")
    jwt.verify(token[1],"hashNode",function(err,result){
        if(!result){
            let err = new Error("Token misMatch")
            err.status =401;
            return next(err)
        }else{
            req.userId = result.userId;
            req.email = result.email;
            next();
            
        }
    })
}