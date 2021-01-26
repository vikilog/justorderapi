const areaModel=require('../../../models/areacode');

let findAreaCode=(req,res,next)=>{
    let conditions={
        _id:req.params.codeId
    };
    let updateData={
        $set:{
            code:req.body.code,
            city:req.body.city,
            country:req.body.country
        }
    };
    areaModel.updateOne(conditions,updateData,(error,updateRes)=>{
        if(error){
            return res.status(500).json({
                success:false,
                isError:true,
                error:error
            });
        }
        else {
           if(updateRes.nModified==1){
            return res.status(200).json({
                success:true,
                message:"Code updated successfully",
                update:updateRes
            });
           }
           else {
            return res.status(200).json({
                success:false,
                message:"fail to update Code",
                update:updateRes
            });
           }
        }
    })
}


module.exports=[findAreaCode]