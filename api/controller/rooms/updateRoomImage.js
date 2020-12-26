const room=require("../../models/rooms");
const mongoose=require("mongoose");

let findRoom=((req,res)=>{  
    console.log(req.body);
    console.log(req.params.roomId);
    room.updateOne({_id:mongoose.Types.ObjectId(req.params.roomId)},{$set:req.body},(error,result)=>{
        console.log(error);
        console.log(result);
        if(error){
            res.send({success:false,isError:true,error:error});
        }
        else{
            res.send({success:true,isError:false,result:result});
        }
    }).catch((error) =>{
        console.log(error);
    });
});

module.exports=findRoom;