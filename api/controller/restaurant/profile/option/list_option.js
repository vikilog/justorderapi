const restaurantModel=require('../../../../models/menu_option');
const mongoose=require('mongoose');


let listSize=async(req,res,next)=>{
    try {
        let conditions=[
            {
                $match:{
                    restaurantId:mongoose.Types.ObjectId(req.decoded._id),
                    menuId:mongoose.Types.ObjectId(req.params.menuId)
                }
            },
            {
                $unwind:{
                    'path':'$options'
                }
            },
            {
                $replaceRoot:{
                    'newRoot':'$options'
                }
            },
            
        ];
        let options=await restaurantModel.aggregate(conditions);
        console.log(options);
        return res.status(200).json({
            success:true,
            message:"List of options",
            options:options
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