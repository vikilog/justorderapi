const region=require('../../models/region');

let getRegion=(request,response,next)=>{
    region.find({},(error,regions)=>{
        if(error){
            console.error(error);
            response.send({
                success:false,
                message:"Error",
                error:error
            });
        }
        else{
            console.log(regions);
            response.send({
                success:true,
                message:"List of regions",
                regions:regions
            });
        }
    })
};

module.exports=getRegion;