const areaModel=require('../../../models/areacode');

let findAreaCode=(req,res,next)=>{
    areaModel.find({country:req.params.regionname},(error,areaCodes)=>{
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
                message:"List of area code",
                areaCodes:areaCodes
            });
        }
    })
}


module.exports=[findAreaCode]