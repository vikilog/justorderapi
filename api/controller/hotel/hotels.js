let hotelsModel=require('../../models/hotel');
let roomModel=require('../../models/rooms');
let mongoose=require('mongoose');

let getHotelDetail = (req, res,next) => {   
    console.log(req.params.hotelId);
    req.data = {};
    hotelsModel.findById(
        {_id:req.params.hotelId},
        (err, hotelDetail) => {
            if (err) {
                console.log(err);
                return res.json({ success: false, isError: true, error: err });
            } else {              
                if (hotelDetail!=null) { 
                    console.log(hotelDetail);                  
                    req.data.hotels=JSON.parse(JSON.stringify(hotelDetail));
                    next();
                } else {
                    return res.json({ success: false, message: "No hotel exists for the given hotel Id." });
                }
            }
        });
};

let getRoom=(req, res,next) => {
    console.log(req.data.hotels._id);
    roomModel.find(
        {hotelId:req.data.hotels._id},
        (err, room) => {
            if (err) {
                console.log(err);
                return res.json({ success: false, isError: true, error: err });
            } else {              
                if (room!=null) {                   
                    return res.json({ success: true, message: "Details of the given hotel as per the user Id.",
                     room: room,
                     hotels:req.data.hotels });
                } else {
                    return res.json({ success: false, message: "No hotel exists for the given hotel Id." });
                }
            }
        });
};

module.exports =[getHotelDetail,getRoom];