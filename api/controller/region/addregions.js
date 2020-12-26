const regionModel=require("../../models/region");

let createRegion=(req,res,next)=>{
    const payload={
        'regionname':req.body.regionname,
        "countryname":req.body.country
    };
    console.log(payload);
    regionModel.create(payload,(err,result)=>{
        if(err){
            console.error(err);
            res.send({
                isSuccess:false,
                message:"Fail to create region",
                error:err
            });
        }
        else{
            console.log(result);
            res.send({
                isSuccess:true,
                message:"Region created successfully",
                result:result
            });
        }
    });
};

module.exports=createRegion;