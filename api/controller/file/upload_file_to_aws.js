const file=require('./file');
const s3=require('./aws');
const config=require('config');
const fs=require('fs')
const restaurant=require('../../models/restaurant');
const mongoose = require('mongoose');

let uploadFile=async(req,res,next)=>{
    try {        
        let path=await fs.createReadStream(config.imagePath+"/"+req.body.file);        
        s3.upload({Bucket:'justorder',Body:path,Key:`restaurant/${req.decoded.id}/${req.body.file}`},(error,data)=>{
            if(error){
                console.log(error)
            return res.status(500).json({
                success:false,
                isError:true,
                error:error
            })
        }
        else {
            console.log(data)
            req.data={};
            req.data.key=data.Key;
            next();            
        }
        });        
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            isError:true,
            error:error.message
        })
    }
}

let updateDataBase=async(req,res,next)=>{
    try {
        let getLastImage=await restaurant.findById({_id:mongoose.Types.ObjectId(req.decoded._id)});
        if(getLastImage.imageurl!=="default.jpg"){
            let deleteRes=await file.deleteFile(getLastImage.imageurl);
            console.log(deleteRes);
        }
        let updateRes=await restaurant.updateOne({_id:mongoose.Types.ObjectId(req.decoded._id)},{$set:{imageurl:req.data.key}});
        if(updateRes.nModified==1){
            return res.status(200).json({
                success:true,
                message:"File save successfully"
            })
        }
        else {
            return res.status(500).json({
                success:false,
                message:"Fail to update image"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            isError:true,
            error:error.message
        })
    }
}

module.exports=[
    uploadFile,
    updateDataBase
]