const mongoose  = require('mongoose');
const restaurantModel=require('../../../../models/restaurant');


let addCoupon=async (req,res,next)=>{
    try {
        let conditions={
            _id:mongoose.Types.ObjectId(req.decoded._id)
        }
        let dataToUpdate={
            $push:{
                coupon:{
                    code:req.body.code,
                    percentDiscount:req.body.percentDiscount
                }
            }
        }
        let updateRes=await restaurantModel.updateOne(conditions,dataToUpdate);
        if(updateRes.nModified==1){
            return res.status(200).json({
                success:true,
                message:"Coupon updated",
                result:updateRes
            })
        }
        else {
         return res.status(500).json({
             success:true,
             message:"Fail to add Coupon",
             result:updateRes
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
    addCoupon
]