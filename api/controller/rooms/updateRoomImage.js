const room=require("../../models/rooms");
const mongoose=require("mongoose");
const hotelModel=require('../../models/hotel');
const s3=require('../file/aws');
const fs=require('fs');
const config=require('config')


let getHotelId=async(req,res,next)=>{
    try {
        let hotel=await room.find({_id:mongoose.Types.ObjectId(req.params.roomId)});
        if(hotel.length>0){
            req.data={};
            req.data.room=hotel[0]
            next();
        }
    } catch (error) {
        res.send({success:false,isError:true,error:error});
    }
}

let getHotel=async(req,res,next)=>{
    try {
        let hotel=await hotelModel.find({_id:mongoose.Types.ObjectId(req.data.room.hotelId)});
        if(hotel.length>0){
            req.data.id=hotel[0].id;
            next();
        }
    } catch (error) {
        res.send({success:false,isError:true,error:error}); 
    }
}

let uploadImage=async(req,res,next)=>{
    try {
        s3.upload({Bucket:'justorder',Body:fs.createReadStream(config.imagePath+"/"+req.body.file),Key:`hotels/${req.data.id}/rooms/${req.data.room.id}/${req.body.file}`},(error,data)=>{
            if(error){
                console.log(error)
                return res.json({ success: false, isError: true, error: error });  
            }
            else {                         
               res.send({success:true,isError:false,key:data.key});
            }
        })
    } catch (error) {
        return res.json({ success: false, isError: true, error: error });  
        
    }
}


module.exports=[
    getHotelId,
    getHotel,
    uploadImage,
];