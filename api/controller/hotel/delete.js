const mongoose = require('mongoose');
const hotelModel=require('../../models/hotel');
const user = require('../../models/user');
const room = require('../../models/rooms');

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
            console.log(hotel);                   
            next();
        } else {
            return response.json({ success: false, message: "No hotel exists for the given hotel Id." });
        }
    }
});
};

let deleteRoom=(request,response,next)=>{
    room.deleteOne({hotelId:mongoose.Types.ObjectId(request.params.hotelId)},(error,result)=>{
        if(error){
            console.log(error);
            return response.json({ success: false, isError: true, error: error });
        }
        else{
        console.log(result);
        next();
        }
    });
};

let deleteHotel = (request,response,next)=>{
    hotelModel.deleteOne({_id:mongoose.Types.ObjectId(request.params.hotelId)},(error,result)=>{
        if(error){
            console.log(error);
            return response.json({ success: false, isError: true, error: error });
        }
        else{
        console.log(result);
        return response.json({ success: true, isError: false, message: "Hotel deleted successfully." }); 
        }
    });
};

module.exports =[
    findUser,
    findHotel,
    deleteRoom,
    deleteHotel,
];