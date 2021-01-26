const areaModel=require('../../../models/areacode');

let createAreaCode=(req,res,next)=>{   
    areaModel.deleteOne({_id:req.params.codeId,createdby:req.decoded._id},(error,code)=>{
        if(error){
            return res.status(500).json({
                success:false,
                isError:true,
                error:error
            });
        }
        else {
            if(code.deleteCount==1){
                return res.status(200).json({
                    success:true,
                    message:"areacode deleted successfully",                    
                });
            }
            else {
                return res.status(500).json({
                    success:false,
                    message:"fail to  deleted areacode",  
                    code:code                  
                });
            }
           
        }
    });
}

module.exports=[createAreaCode]