const s3=require('./aws');
const fs=require('fs');
const config=require('config');
module.exports={
    getFileUrl:async(imageReference)=>{
        try {
            const fileUrl=s3.getSignedUrl('getObject',{Bucket:'justorder',Key:imageReference,});
            console.log(fileUrl);
            return fileUrl;
        } catch (error) {
            return error;
        }
    },
    uploadFile:async(file,id)=>{
        try {
            return s3.upload({Bucket:'justorder',Body:fs.createReadStream(config.imagePath+"/"+file),Key:`restaurant/${id}/${file}`}).promise();
        } catch (error) {
            return error;
        }
    },
    listFileOfFolder:async(key)=>{
        try {
            return s3.listObjects({Bucket:'justorder',Delimiter:'',Prefix:key}).promise();
        } catch (error) {
            return error;
        }
    },
    deleteFile:async(key)=>{
        try {
            return s3.deleteObject({Bucket:'justorder',Key:key}).promise();
        } catch (error) {
            return error;
        }
    }
}