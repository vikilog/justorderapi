const restaurantModel=require('../../../../models/restaurant');
const mongoose=require('mongoose');


let findCategory=async(req,res,next)=>{
    try {
        let restaurant=await restaurantModel.findById({_id:mongoose.Types.ObjectId(req.decoded._id)});
        if(restaurant.isActive){
            let category=restaurant.category.filter((cat)=>cat._id.toString()===req.body.categoryId.toString());
            if(category.length>0){
                next();
            }
            else {
                return res.status(500).json({
                    success:false,
                    isError:true,
                    message:"This category doesn't exist"
                })
            }
        }
        else{
            return res.status(500).json({
                success:false,
                isError:true,
                message:"Your account is currently suspended.Try again later"
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

let addCategory=async(req,res,next)=>{
    try {
        let conditions={
            _id:mongoose.Types.ObjectId(req.decoded._id),
            "category._id":mongoose.Types.ObjectId(req.body.categoryId)            
        };
        let dataToUpdate={
            $set:{
                "category.$.categoryName":req.body.name
            }
        };
        let updateRes=await restaurantModel.updateOne(conditions,dataToUpdate);
        if(updateRes.nModified==1){
            return res.status(200).json({
                success:true,
                message:"Category updated",
                updateRes:updateRes
            })
        }
        else {
            return res.status(500).json({
                success:false,
                message:"Fail to update Category",
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
    findCategory,
    addCategory
]