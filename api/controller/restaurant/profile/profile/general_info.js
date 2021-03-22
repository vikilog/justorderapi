const mongoose  = require('mongoose');
const restaurantModel=require('../../../../models/restaurant');
const config=require('config');
const file=require('../../../file/file');


let generalInfo=async(req,res,next)=>{
    try {
        let conditions=[
            {
                $match:{
                    _id:mongoose.Types.ObjectId(req.decoded._id)
                }
            },
            {
                $project:{
                    status:1,
                    cardStatus:1,
                    collectStatus:1,
                    deliveryStatus:1,
                    imageurl:1
                }
            }
        ]
        let info=await restaurantModel.aggregate(conditions);
        req.data={};
        req.data.info=info[0];
        next();
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            isError:true,
            error:error
        })
    }
}

let getImage=async(req,res,next)=>{
    try {        
        if(req.data.info.imageurl==="default.jpg"){
            req.data.info.imageUrl=config.fileUrl+"/default.jpg";
        }
        else {            
            req.data.info.imageurl=await file.getFileUrl(req.data.info.imageurl);            
        }
        return res.status(200).json({
            success:true,
            info:req.data.info
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            isError:true,
            error:error
        })
    }
}


module.exports=[
    generalInfo,
    getImage
]