const restaurantModel=require('../../models/restaurant');
const config=require('config');
const file=require('../file/file')

let findRestaurants=(req,res,next)=>{
    let conditions=[
        {
            "$match":{
               "$expr":{
                createdby:req.decoded._id
               }
            }
        },        
    ];
    restaurantModel.aggregate(conditions,(error,restaurants)=>{
        if(error){
            console.error(error);
            return res.send({
                success:false,
                isError:true,
                error:error
            })
        }
        else{
           req.data={};
           req.data.restaurants=restaurants;
           next();           
        }
    });
}

let getImageUrl=async(req,res,next)=>{
    try {
        if(req.data.restaurants.length>0){
            await Promise.all(req.data.restaurants.map(async(r)=>{
                let url=await checkImageUrl(r.imageurl);
                r.imageurl=url;
            }))
        }
        return res.send({
            success:true,
            message:"List of restaurants",
            restaurants:req.data.restaurants
        })
    } catch (error) {
        console.error(error);
            return res.send({
                success:false,
                isError:true,
                error:error
            })
    }
}

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
        return url;
    } catch (error) {
        console.log(error)
        throw new Error("Fail to get image url");
    }
}

module.exports=[findRestaurants,getImageUrl];