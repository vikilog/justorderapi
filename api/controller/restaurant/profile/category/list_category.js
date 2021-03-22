const restaurantModel=require('../../../../models/restaurant');
let mongoose=require('mongoose');


let findCategorys=async(req,res,next)=>{
    try {
        let conditions=[
            {
                $match:{
                    _id:mongoose.Types.ObjectId(req.decoded._id)
                }
            },
            {
                $unwind:{
                    'path':'$category'
                }
            },
            {
                $replaceRoot:{
                    'newRoot':'$category'
                }
            }
        ];
        let categories=await restaurantModel.aggregate(conditions);
        console.log(categories);
        return res.status(200).json({
            success:true,
            message:"List of categories",
            categories:categories
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
    findCategorys
]