const serviceModel=require('../../../models/services');
const jwt=require('jsonwebtoken');
const config=require('config');


let findService=(req,res,next)=>{
  
    let token=req.headers['x-access-token']||req.body.token;
    jwt.verify(token,config.secret,(err,isMatch)=>{
        if(err){
            return res.json({success:false,isError:true,error:err});
        }
        else{
            if(isMatch){
                let conditions=[
                    {
                    "$match":{
                        $expr:{
                                'hotelid':isMatch._id
                        }
                    },
                },
                {
                    $sort:{
                        "created": -1
                    }
                }
            ];
            serviceModel.aggregate(conditions,(error,booking)=>{        
                    if(error){
                        return res.json({success:false,isError:true,error:error});
                    }
                    else{
                        return res.json({success:true,message:"List of services",services:booking});
                    }
                }); 
            }
        }
    })
 
};

module.exports=[findService];