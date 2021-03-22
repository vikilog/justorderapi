const restaurantModel=require('../../../../models/menu_option');
const mongoose=require('mongoose');



let addMenu=async(req,res,next)=>{
    console.log("here");
        let conditions={
            restaurantId:mongoose.Types.ObjectId(req.decoded._id),            
            menuId:mongoose.Types.ObjectId(req.body.menuId),
            "options._id":mongoose.Types.ObjectId(req.body.optionId)            
        }   
        let dataToUpdate={
            $push:{
                "options.$.opt":{
                    "description":req.body.description,
                    "optionNumber":req.body.optionNumber,
                    "price":req.body.price,
                    "otherLangTitle":req.body.otherLangTitle,
                    "name":req.body.name
                }
            }
        }
        console.log(conditions);
        try {
            let updateRes=await restaurantModel.updateOne(conditions,dataToUpdate);
            if(updateRes.nModified==1){
                return res.status(200).json({
                    success:true,
                    message:"option added successfully",
                    updateRes:updateRes
                })
            }
            else {
                return res.status(500).json({
                    success:false,
                    message:"fail to add option",
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
    addMenu
]