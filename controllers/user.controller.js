const knex = require('../data/db');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
module.exports.register = async(req,res)=>{
    let password = req.body.password;
    let saltRandom = Math.floor(Math.random()*10)
    let salt = bcrypt.genSaltSync(saltRandom)
    bcrypt.hash(password,salt,function(err,hash){
        if(err){
            res.json({message:"Erorr while hashing"})
        }
    
    let insertObject ={};
    insertObject.name = req.body.name;
    insertObject.email = req.body.email;
    insertObject.salt = salt;
    insertObject.password =hash;

 knex("tbl_user").insert(insertObject).then((doc)=>{
        res.json({status:"success",message:"success"})
    }).catch((err)=>{
        res.json({status:"error",message:"errror"})
    })
})
}

module.exports.login= async(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    await knex("tbl_user").select('*').where('email',email).then((doc)=>{
        bcrypt.compare(password,doc[0].password).then((isMatch)=>{
            if(!isMatch){
                let err = new Error("Email Id or password does not exist");
                err.status =404;
                return next(err);
            }else
            {
                let payLoad = {
                        userId:doc[0].userId,
                        email:doc[0].email
                }
                jwt.sign(payLoad,"hashNode",(err,jwtToken) => {
                    res.json({
                        status:"200",
                         token:jwtToken
                    })
                })
        }
        })
    }).catch((err)=>{
            res.json({status:"error",message:"error"})
    })

}

module.exports.viewDetails = async(req,res) => {
    let userId = req.userId
    await knex('tbl_user').select('*').where('userId',userId).then((doc)=>{
        res.json({status:"success",message:doc})
    }).catch((err)=>{
        res.json({status:"err",message:"err"})

    })
}