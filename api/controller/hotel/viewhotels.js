const mongoose=require('mongoose');
const hotelModel=require("../../models/hotel");

let getHotelDetails=(request,response)=>{
     
    hotelModel.find({},(error,hotelList)=>{
        if(error){
            return response.json({ success: false, isError: true, error: error });
        }
        else{
            return response.json({ success: true, message: "List of hotels", hotels: hotelList });
        }
    });
};

module.exports=getHotelDetails;