let hotelsModel=require('../../models/hotel');
let roomModel=require('../../models/rooms');
let mongoose=require('mongoose');
let config=require('config');
const file=require('../file/file');

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
    console.log(req.params)  
    roomModel.find(
        {hotelId:`${req.params.hotelId}`},
        (err, room) => {
            if (err) {
                console.log(err);
                return res.json({ success: false, isError: true, error: err });
            } else {              
                if (room!=null) {  
                    req.data.room=room;
                    next();                
                    
                } else {
                    return res.json({ success: false, message: "No hotel exists for the given hotel Id." });
                }
            }
        });
};

let getImages=async(req,res,next)=>{
    try {
        let imageurl=await checkImageUrl(req.data.hotels.hotelimage);
        req.data.hotels.hotelimage=imageurl;
        if(req.data.room&&req.data.room.length>0){
            let singleRoomImage=await checkImageUrl(req.data.room[0].singleRoomImage);
            let doubleRoomImage=await checkImageUrl(req.data.room[0].doubleRoomImage);
            let duplexRoomImage=await checkImageUrl(req.data.room[0].duplexRoomImage);
            let dulexRoomImage=await checkImageUrl(req.data.room[0].dulexRoomImage);
            req.data.room[0].singleRoomImage=singleRoomImage;
            req.data.room[0].doubleRoomImage=doubleRoomImage;
            req.data.room[0].dulexRoomImage=dulexRoomImage;
            req.data.room[0].duplexRoomImage=duplexRoomImage;
        }
        console.log(req.data.room)
        return res.status(200).json({
            success:true,
            hotels:req.data.hotels,
            room:req.data.room
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,isError:true,error:error})
    }
}

module.exports =[
    getHotelDetail,
    getRoom,
    getImages
];


async function checkImageUrl(imageUrl) {
    try {
        let url;        
        if(imageUrl&&imageUrl!==undefined){
            if(imageUrl==="default.jpg"){
                url= config.filePath+"/default.jpg"
            }
            else {
                url=await file.getFileUrl(imageUrl);            
            }
        }    
        console.log(url);    
        return url;
    } catch (error) {
        throw new Error("Fail to get image url");
    }
}