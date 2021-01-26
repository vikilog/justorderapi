let hotelsModel=require('../../models/hotel');
let roomModel=require('../../models/rooms');
let mongoose=require('mongoose');

let getHotelDetail = (req, res,next) => {  
    let _id=req.params.hotelId||req.decoded._id;
    hotelsModel.findById({_id:_id},
        (err, hotelDetail) => {
            if (err) {
                console.log(err);
                return res.json({ success: false, isError: true, error: err });
            } else {    
                console.log(hotelDetail);          
                if (hotelDetail!=null) { 
                    req.data={};                  
                    req.data.hotels=JSON.parse(JSON.stringify(hotelDetail));
                    next();
                } else {
                    return res.json({ success: false, message: "No hotel exists for the given hotel Id." });
                }
            }
        });
};

let getRoom=(req, res,next) => {    
    roomModel.find(
        {hotelId:req.decoded._id||req.params.hotelId},
        (err, room) => {
            if (err) {
                console.log(err);
                return res.json({ success: false, isError: true, error: err });
            } else {              
                if (room!=null) {                   
                    return res.json({ success: true, message: "Details of the given hotel as per the user Id.",
                     room: room,
                    hotels:req.data.hotels
                     });
                } else {
                    return res.json({ success: false, message: "No hotel exists for the given hotel Id." });
                }
            }
        });
};

module.exports =[
    getHotelDetail,
    getRoom
];