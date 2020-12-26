const roomModel =require("../../models/rooms");
const mongoose=require("mongoose");

let updateRoom=(req, res,next) => {
    console.log(req.body); 
    console.log(req.url); 
    roomModel.findByIdAndUpdate({_id:req.params.roomId},{$set:req.body},(err, room)=>{
        console.log(err);
        return res.send({room:room});
    });
};

module.exports =updateRoom;