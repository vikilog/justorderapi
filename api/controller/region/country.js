const countryModel=require('../../models/country');

let findCountries=(req,res,next)=>{
    countryModel.find({},(err,countries)=>{
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
                message:"List of countries",
                countries:countries
            });
        }
    });
};

module.exports=findCountries;