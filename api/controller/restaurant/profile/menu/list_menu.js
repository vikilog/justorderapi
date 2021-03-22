const restaurantModel=require('../../../../models/restaurant');
const mongoose=require('mongoose');


let listMenu=async(req,res,next)=>{
    try {
        let conditions=[
            {
                $match:{
                    _id:mongoose.Types.ObjectId(req.decoded._id)
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
            }
        ];
        let menus=await restaurantModel.aggregate(conditions);
        console.log(menus);
        return res.status(200).json({
            success:true,
            message:"Menu List",
            menus:menus
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
    listMenu
]