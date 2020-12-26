const cityModel=require('../../models/city');

let findCity=(request,response,next)=>{
    cityModel.find({"region":request.body.region},(error,cities)=>{
        if(error){
            console.log(error);
            response.send({
                success:false,
                message:"Error",
                error:error
            });
        }        
        else{
            response.send({
                success:true,
                message:"List of cities for given region",
                cities:cities
            });
        }
    });
};

module.exports=findCity;