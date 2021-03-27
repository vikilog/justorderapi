const roomModel=require("../../models/rooms");
const file=require('../file/file');
const config=require('config');

let findRoom = (req,res,next)=>{
    roomModel.find({hotelId:req.params.hotelId},(error,room)=>{
        if(error){
            return res.json({ success: false, isError: true, error: error });
        }
        else{
            if(room!=null){
                req.data={};
                req.data.room=room;
                next();                
            }
            else{
                return res.json({ success: false, message: "No room available for this hotel"});
            }
        }
    });
};

let getImages=async(req,res,next)=>{
    try {        
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
            room:req.data.room
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,isError:true,error:error})
    }
}

module.exports =[
    findRoom,
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