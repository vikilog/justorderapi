const mongoose = require("mongoose");
const hotelModel = require("../../models/hotel");
const user = require("../../models/user");
const s3=require('../file/aws');
const config=require('config');
const fs=require('fs');


let findUser=(request,response,next) => {
    user.find({_id:mongoose.Types.ObjectId(request.decoded._id)},(err,user) => {
        if(err){ 
            console.log(error);                
            return response.json({ success: false, isError: true, error: err });
        }
        else{
            if(user==null){
                return response.json({ success: false, isError: true, error:"Not a valid user"});
            }
            else{
                console.log(user);
                next();
            }
        }
        
    });
};

let findHotel =(request,response,next) => {
hotelModel.findById({_id:mongoose.Types.ObjectId(request.params.hotelId)},(error,hotel) => {
    if (error) {
        console.log(error);
        return response.json({ success: false, isError: true, error: error });
    }
    else{
        if (hotel!=null) {                       
            next();
        } else {
            return response.json({ success: false, message: "No hotel exists for the given hotel Id." });
        }
    }
});
};

let uploadImage=async(req,res,next)=>{
    try {
        s3.upload({Bucket:'justorder',Body:fs.createReadStream(config.imagePath+"/"+req.body.file),Key:`hotels/${req.decoded.id}/${req.body.file}`},(error,data)=>{
            if(error){
                console.log(error)
                return res.json({ success: false, isError: true, error: error });  
            }
            else {
                console.log(data);
               req.data={};
               req.data.key=data.key;
               next(); 
            }
        })
    } catch (error) {
        return res.json({ success: false, isError: true, error: error });  
        
    }
}

let updateImage=((request,response,next)=>{
    hotelModel.updateOne({_id:request.params.hotelId},{$set:{"hotelimage":request.data.key}},(error,hotel)=>{
        if(error){
            return response.json({ success: false, isError: true, error: error });  
        }
        else{
            return response.json({ success: true,isError:false ,hotel: hotel });  
        }
    });
   
});

module.exports=[ 
    findUser,
    findHotel,
    uploadImage,
    updateImage
];