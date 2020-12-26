const roomModel=require("../../models/rooms");

let findRoom = (req,res,next)=>{
    roomModel.find({hotelId:req.params.hotelId},(error,room)=>{
        if(error){
            return res.json({ success: false, isError: true, error: error });
        }
        else{
            if(room!=null){
                return res.json({ success: true, message: "rooms", room: room });
            }
            else{
                return res.json({ success: false, message: "No room available for this hotel"});
            }
        }
    });
};

module.exports =[
    findRoom
];