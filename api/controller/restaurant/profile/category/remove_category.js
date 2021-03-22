const restaurantModel=require('../../../../models/restaurant');
const mongoose=require('mongoose');


let removeCategory=async(req,res,next)=>{
    try {
        let conditions={
            _id:mongoose.Types.ObjectId(req.body.restaurantId)
        };
        let dataToUpdate={
            $pull:{
                category:{
                    _id:mongoose.Types.ObjectId(req.body.categoryId)
                }
            }
        };
        let updateRes=await restaurantModel.updateOne(conditions,dataToUpdate);
        if(updateRes.nModified==1){
            next()
        }
        else {
            return res.status(500).json({
                success:false,
                message:"Fail to remove Category",
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

let removeMenu=async(req,res,next)=>{
    try {
        let conditions={
            _id:mongoose.Types.ObjectId(req.body.restaurantId)
        };
        let dataToUpdate={
            $pull:{
                category:{
                    "menus.categoryId":mongoose.Types.ObjectId(req.body.categoryId)
                }
            }
        };
        let removeMenuRes=await restaurantModel.updateOne(conditions,dataToUpdate);
        if(removeMenuRes.nModified==1){
            return res.status(200).json({
                success:true,
                message:"Category removed",
                updateRes:updateRes
            })
        }
        else {
            return res.status(200).json({
                success:true,
                message:"Category removed but fail to remove menu",
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
    removeCategory,
    removeMenu
]