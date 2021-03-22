const bookingModel=require('../../models/booking');
const mongoose=require('mongoose');

let createBooking=(req,res,next)=>{  
    let bookingPayload={
        name:req.body.name,
        description:req.body.description,
        checkin:req.body.checkin,
        checkout:req.body.checkout,
        hotelid:mongoose.Types.ObjectId(req.decoded._id),
        roomtype:req.body.roomtype,
        created:Date.now(),
        updated:Date.now()
    };
    bookingModel.create(bookingPayload,(error,result)=>{
        if(error){
            return res.json({success:false,isError:true,error:error});
        }
        else{
            return res.json({success:true,message:"Booking added successfully",booking:result});
        }
    });
};

module.exports=[
    createBooking
];