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
        console.log(error)
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
            "menus.categoryId":mongoose.Types.ObjectId(req.body.categoryId),
            "menus._id":mongoose.Types.ObjectId(req.body.menuId)            
        }
        let dataToUpdate={
            $push:{
                "menus.$.size":{                    
                    "title":req.body.title,
                    "price":req.body.price
                }
            }
        }       
        try {
            let updateRes=await restaurantModel.updateOne(conditions,dataToUpdate);
            console.log(updateRes);
            if(updateRes.nModified==1){
                return res.status(200).json({
                    success:true,
                    message:"size added successfully",
                    updateRes:updateRes
                })
            }
            else {
                return res.status(500).json({
                    success:false,
                    message:"fail to add size",
                    updateRes:updateRes
                })
            }
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
    findCategory,
    addMenu
]