const bookingModel=require('../../models/booking');

let deleteBooking=(req,res,next)=>{
    let conditions=[
        {
            'hotelid':req.decoded._id,
            '_id':req.body._id
        }
    ];
    bookingModel.findOneAndDelete(conditions,(error,result)=>{
        if(error){
            return res.json({
                success:false,
                isError:true,
                error:error
            });
        }
        else {
            return res.json({
                success:true,
                message:"Booking deleted successfully"                
            });
        }
    });
}

module.exports=[
    deleteBooking
];