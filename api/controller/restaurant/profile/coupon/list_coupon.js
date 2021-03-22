const restaurantModel=require('../../../../models/restaurant');
const mongoose=require('mongoose');


let listCoupon=async(req,res,next)=>{
    try {
        let conditions=[
            {
                $match:{
                    _id:mongoose.Types.ObjectId(req.decoded._id),                   
                }
            },
            {
                $unwind:{
                    'path':'$coupon'
                }
            },
            {
                $replaceRoot:{
                    'newRoot':'$coupon'
                }
            },           
        ];
        let coupons=await restaurantModel.aggregate(conditions);
        return res.status(200).json({
            success:true,
            message:"List of coupons",
            coupons:coupons
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            isError:true,
            error:error
        })
    }
}


module.exports=[
    listCoupon
]