const countryModel=require('../../models/country');

let createCountry=(req,res,next)=>{
    const data={
        'countryname':req.body.countryname,
        'created':Date.now()
    };
    countryModel.create(data,(err,result)=>{
        if(err){
            return res.send({
                success:false,
                isError:true,
                error:err
            });
        }
        else{
            return res.send({
                success:true,
                message:"Country added successfully",
                result:result
            });
        }
    })
};

module.exports=createCountry;