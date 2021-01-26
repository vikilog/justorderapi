const areaModel=require('../../../models/areacode');
const ukSchema=require('../../../models/ukcode');

let createAreaCode=(req,res,next)=>{
    if(req.body.country=="UK"){
        let payload={
            country:req.body.country,
            townarea:req.body.townarea,
            code:req.body.code,
            regionname:req.body.townarea,
            createdby:req.decoded._id
        };
        ukSchema.create(payload,(error,code)=>{
            if(error){
                return res.status(500).json({
                    success:false,
                    isError:true,
                    error:error
                });
            }
            else {
                return res.status(200).json({
                    success:true,
                    message:"areacode created successfully",
                    areaCodes:code
                });
            }
        });
    }
    else {
        let payload={
            country:req.body.country,
            city:req.body.city,
            code:req.body.code,
            createdby:req.decoded._id
        };
        areaModel.create(payload,(error,code)=>{
            if(error){
                return res.status(500).json({
                    success:false,
                    isError:true,
                    error:error
                });
            }
            else {
                return res.status(200).json({
                    success:true,
                    message:"areacode created successfully",
                    areaCodes:code
                });
            }
        });
    }
    
}

module.exports=[createAreaCode]