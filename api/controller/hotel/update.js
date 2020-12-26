const mongoose = require("mongoose");
const hotelModel=require("../../models/hotel");
const user=require("../../models/user");


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

let updateHotel=(request,response,next)=>{
    hotelModel.updateOne({_id:mongoose.Types.ObjectId(request.params.hotelId)},{$set:request.body},(error,hotel) => {
        if(error){
            console.log(error);
            console.log(hotel);
            return response.json({ success: false, isError: true, error: error });
        }
        else{
            if(hotel!=null){
                console.log(hotel);
                return response.json({ success: true, message: "Hotel updated successfully", hotel: hotel });
            }
            else{
                return response.json({ success: false, message: "No hotel exists for the given hotel Id." });
            }
        }
    });
};

module.exports=[
    findUser,
    findHotel,
    updateHotel
];