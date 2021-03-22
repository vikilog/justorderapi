const regionModel=require('../../models/region');

let findRegion=(req,res,next)=>{
    regionModel.find({'countryname':req.params.countryname},(err,regions)=>{
      if(err){
        res.json({
            success:false,
            isError:true,
            error:err
        });
      }
      else{
        res.json({
            success:true,               
            message:"List of regions",
            regions:regions
        });
      }
    })
};

module.exports=findRegion;