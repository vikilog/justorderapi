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
        console.error(error);
        return res.status(500).json({
            success:false,
            isError:true,
            error:error
        })
    }
}

let addMenu=async(req,res,next)=>{
        let conditions={
            _id:mongoose.Types.ObjectId(req.decoded._id),
            "menus.categoryId":req.body.categoryId,
            "menus._id":mongoose.Types.ObjectId(req.body.menuId),
            "menus.size._id":mongoose.Types.ObjectId(req.body.sizeId)            
        }
        let dataToUpdate={
            $pull:{
                "menus.$.size":{
                    _id:mongoose.Types.ObjectId(req.body.sizeId)
                }
            }
        }
        try {
            let updateRes=await restaurantModel.updateOne(conditions,dataToUpdate);
            if(updateRes.nModified==1){
                return res.status(200).json({
                    success:true,
                    message:"size removed successfully",
                    updateRes:updateRes
                })
            }
            else {
                return res.status(500).json({
                    success:false,
                    message:"fail to remove successfully",
                    updateRes:updateRes
                })
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success:false,
                isError:true,
                error:error
            })
        }
}


module.exports=[
    findCategory,
    addMenu
]