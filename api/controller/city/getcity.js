const cityModel=require('../../models/city');
const ukModel=require('../../models/ukcode');

let findCity=(request,response,next)=>{
    if(request.params.region=="UK"){
        ukModel.find({},(error,cities)=>{
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
    }
    else {
        cityModel.find({"region":request.params.region},(error,cities)=>{
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
    }
};

module.exports=findCity;