const restaurantModel=require('../../../../models/restaurant');
const mongoose=require('mongoose');


let addCategory=async(req,res,next)=>{
    try {
        let conditions={
            _id:mongoose.Types.ObjectId(req.decoded._id)
        };
        let dataToUpdate={
            $push:{
                category:{
                    categoryName:req.body.name
                }
            }
        };
        let updateRes=await restaurantModel.updateOne(conditions,dataToUpdate);
        if(updateRes.nModified==1){
            return res.status(200).json({
                success:true,
                message:"Category added",
                updateRes:updateRes
            })
        }
        else {
            return res.status(500).json({
                success:false,
                message:"Fail to add Category",
                updateRes:updateRes
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
    addCategory
]