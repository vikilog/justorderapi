const restaurantModel=require('../../../../models/restaurant');
const mongoose=require('mongoose');


let removeTime=async(req,res,next)=>{
    try {
        let conditions={
            _id:mongoose.Types.ObjectId(req.decoded._id),
            "timing._id":mongoose.Types.ObjectId(req.params.timeId)
        }
        let dataToUpdate={
            $pull:{
               timing:{
                   _id:mongoose.Types.ObjectId(req.params.timeId)
               } 
            }
        }

        let removeRes=await restaurantModel.updateOne(conditions,dataToUpdate);
        if(removeRes.nModified==1){
            next();
        }
        else {
            return res.status(500).json({
                success:false,
                message:"Fail to update time"
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

let addTime=async(req,res,next)=>{
    try {
        let conditions={
            _id:mongoose.Types.ObjectId(req.decoded._id),            
        }
        let dataToUpdate={
            $push:{
               timing:req.body
            }
        }
        let updateRes=await restaurantModel.updateOne(conditions,dataToUpdate);       
        if(updateRes.nModified==1){
            return res.status(200).json({
                success:true,
                message:"time updated successfully"                
            })
        }
        else {
            return res.status(500).json({
                success:false,
                message:"Fail to update time"
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
    removeTime,
    addTime
]