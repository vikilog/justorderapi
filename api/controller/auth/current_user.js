const jwt = require('jsonwebtoken');
const config = require('config');


let findCurrentUser=async(req,res,next)=>{
    try {
        let token=req.headers['x-access-token'];
    if(token){
        jwt.verify(token,config.secret,(error,decoded)=>{
            if(error){
                return res.status(403).json({
                    success:false,
                    message:"Fail to verify token"
                })  
            }
            else {
                console.log(decoded);
                return res.status(200).json({
                    success:true,
                    token:token,
                    decoded:decoded
                })
            }
        });
    }
    else {
        return res.status(403).json({
            success:false,
            message:"No token found"
        })
    }
    } catch (error) {
        return res.status(500).json({
            success:false,
            isError:true,
            error:error
        })
    }
}




module.exports=[
    findCurrentUser
]