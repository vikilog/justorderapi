const restaurantModel=require('../../../../models/restaurant');
const mongoose=require('mongoose');


let listSize=async(req,res,next)=>{
    try {
        let conditions=[
            {
                $match:{
                    _id:mongoose.Types.ObjectId(req.decoded._id),
                    "menus._id":mongoose.Types.ObjectId(req.params.menuId)
                }
            },
            {
                $unwind:{
                    'path':'$menus'
                }
            },
            {
                $replaceRoot:{
                    'newRoot':'$menus'
                }
            },
            {
                $unwind:{
                    'path':'$size'
                }
            },
            {
                $replaceRoot:{
                    'newRoot':'$size'
                }
            }
        ];
        let sizes=await restaurantModel.aggregate(conditions);
        return res.status(200).json({
            success:true,
            message:"List of sizes",
            size:sizes
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
    listSize
]