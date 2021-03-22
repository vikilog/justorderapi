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

let pullMenu=async(req,res,next)=>{
    try {
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
        let pullResult=await restaurantModel.update(conditions,dataToUpdate);
        console.log(pullResult);
        if(pullResult.nModified==1){
            next();
        }
        else {
            return res.status(500).json({
                success:false,
                isError:true,
                message:"Fail to update menu"
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

let addMenu=async(req,res,next)=>{
    let conditions={
        _id:mongoose.Types.ObjectId(req.decoded._id),            
    }
    let dataToUpdate={
        $push:{
            menus:{
                categoryId:req.body.categoryId,
                name:req.body.name,
                menuNo:req.body.menuNo,
                description:req.body.description,
                title:req.body.title,
                repeat:req.body.repeat,
                isSize:req.body.isSize,
                discount:req.body.discount,
                otherLangTitle:req.body.otherLangTitle,
                price:req.body.price,                  
                
            }
        }
    }
    try {
        let updateRes=await restaurantModel.updateOne(conditions,dataToUpdate);
        if(updateRes.nModified==1){
            return res.status(200).json({
                success:true,
                message:"menu updated successfully",
                updateRes:updateRes
            })
        }
        else {
            return res.status(500).json({
                success:false,
                message:"fail to update menu",
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
    findCategory,
    pullMenu,
    addMenu
]