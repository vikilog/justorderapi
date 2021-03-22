const mongoose  = require('mongoose');
const restaurantModel=require('../../../../models/restaurant');

let listCharge=async(req,res,next)=>{
    try {
        let conditions=[
            {
                $match:{
                    _id:mongoose.Types.ObjectId(req.decoded._id)
                }
            },
            {
                $project:{
                    deliveryCharge:1,
                    serviceCharge:1,
                    "orderLimit":1
                }
            }
        ];
        let charges=await restaurantModel.aggregate(conditions);
        return res.status(200).json({
            success:true,
            message:"Charges",
            charges:charges
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            isError:true,
            error:error
        })
    }
}


module.exports=[
    listCharge
]