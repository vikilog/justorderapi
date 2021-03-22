const restaurantModel=require('../../../../models/menu_option');
const mongoose=require('mongoose');


let createMenuOption=async(req,res,next)=>{
    try {
        let checkDoc=await restaurantModel.find({menuId:req.params.menuId,restaurantId:req.decoded._id});
        console.log(checkDoc);
        if(checkDoc.length>0){
            req.data={};
            req.data.option=checkDoc[0];
            next();
        }
        else {
            let createNewOption=restaurantModel.create({menuId:req.params.menuId,restaurantId:req.decoded._id})
            if(createNewOption){
                req.data={};
                req.data.option=createNewOption;
                next()
            }
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
            _id:mongoose.Types.ObjectId(req.data.option._id),                      
        }
        let o=JSON.parse(req.body.options)
        let dataToUpdate={
            $push:{
                options:{
                    "heading":req.body.heading,
                    "multiple":req.body.multiple,                    
                }
            }
        }
        console.log(dataToUpdate,conditions);
        try {
            let updateRes=await restaurantModel.updateOne(conditions,dataToUpdate);
            console.log(updateRes);
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
    createMenuOption,   
    addMenu
]