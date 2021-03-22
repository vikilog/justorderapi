const restaurantModel=require('../../../../models/restaurant');
const mongoose=require('mongoose');


let findCategory=async(req,res,next)=>{
    try {
        let restaurant=await restaurantModel.findById({_id:mongoose.Types.ObjectId(req.decoded._id)});
        if(restaurant.isActive){
            let category=restaurant.category.filter((cat)=>cat._id.toString()===req.body.categoryId.toString());
            console.log(req.body);
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

let addMenu=async(req,res,next)=>{
        let conditions={
            _id:mongoose.Types.ObjectId(req.decoded._id),            
        }
        let dataToUpdate={
            $pull:{
                menus:{
                    categoryId:req.body.categoryId,
                    _id:mongoose.Types.ObjectId(req.body.menuId)
                }
            }
        }
        try {
            let updateRes=await restaurantModel.update(conditions,dataToUpdate);
            if(updateRes.nModified==1){
                return res.status(200).json({
                    success:true,
                    message:"menu removed successfully",
                    updateRes:updateRes
                })
            }
            else {
                return res.status(500).json({
                    success:false,
                    message:"fail to remove menu",
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
    addMenu
]