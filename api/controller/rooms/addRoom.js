const roomModel=require("../../models/rooms");

let createRoom=(request,response,next)=>{
    roomModel.create(request.body,(error,result)=>{
        if(error){
            response.send({
                success:false,
                isError:true,
                error:error
            });
        }
        else{
            response.send({success:true,isError:false,result:result});
        }
    });
};

module.exports=createRoom;
