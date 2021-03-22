const restaurantModel=require('../../../../models/restaurant');
const mongoose=require('mongoose');

let removeTime=async(req,res,next)=>{
    try {
        let conditions={
            _id:mongoose.Types.ObjectId(req.decoded._id)
        }
        let dataToUpdate={
            $pull:{
                timing:{
                    _id:mongoose.Types.ObjectId(req.params.timeId)
                }
            }
        }
        let updateRes=await restaurantModel.updateOne(conditions,dataToUpdate);
        if(updateRes.nModified==1){
            return res.status(200).json({
                success:true,
                message:"time removed successfully"                
            })
        }
        else {
            return res.status(500).json({
                success:false,
                message:"Fail to remove time"
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
    removeTime
]