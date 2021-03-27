const mongoose=require('mongoose');
const hotelModel=require("../../models/hotel");
const config = require('config');
const file =require('../file/file');

let getHotelDetails=(req,response,next)=>{
     
    hotelModel.find({addedby:req.decoded._id},(error,hotelList)=>{
        if(error){
            return response.json({ success: false, isError: true, error: error });
        }
        else{
            req.data={};
            req.data.hotels=hotelList;
            next();            
        }
    });
};


let getHotelImage=async(req,res,next)=>{
    try {
        if(req.data.hotels.length>0){
            await Promise.all(req.data.hotels.map(async(h)=>{
                if(h.hotelimage==='default.jpg'){
                    console.log("default");
                    h.hotelimage=config.filePath+'/default.jpg'
                }
                else {
                    h.hotelimage=await file.getFileUrl(h.hotelimage); 
                }
            }))
        }       
        return res.json({ success: true, message: "List of hotels", hotels:req.data.hotels });       
    } catch (error) {
        console.log(error)
        return res.json({ success: false, isError: true, error: error });
    }
}


module.exports=[getHotelDetails,getHotelImage];
