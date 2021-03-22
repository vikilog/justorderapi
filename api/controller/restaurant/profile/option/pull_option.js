const restaurantModel=require('../../../../models/menu_option');
const mongoose=require('mongoose');



let pullOpt=async(req,res,next)=>{
    console.log("here");
        let conditions={
            restaurantId:mongoose.Types.ObjectId(req.decoded._id),            
            menuId:mongoose.Types.ObjectId(req.body.menuId),
            "options._id":mongoose.Types.ObjectId(req.body.optionId)            
        }   
        let dataToUpdate={
            $pull:{
                "options.$.opt":{
                   _id:mongoose.Types.ObjectId(req.body.optId)
                }
            }
        }
        console.log(conditions);
        try {
            let updateRes=await restaurantModel.updateOne(conditions,dataToUpdate);
            if(updateRes.nModified==1){
                return res.status(200).json({
                    success:true,
                    message:"option removed successfully",
                    updateRes:updateRes
                })
            }
            else {
                return res.status(500).json({
                    success:false,
                    message:"fail to remove option",
                    updateRes:updateRes
                })
            }
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
    pullOpt
]