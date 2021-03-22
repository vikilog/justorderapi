const serviceModel=require('../../../models/services');

let createService=(req,res,next)=>{
    let service=req.body;
    let servicePayload={
        servicename:service.name,
        rooms:service.rooms,
        oldprice:service.oldprice,
        newprice:service.newprice,
        hotelid:req.decoded._id,
        created:new Date(),
        updated:new Date(),
        status:service.status
    };
    serviceModel.create(servicePayload,(error,service)=>{
        if(error){
            return res.json({success:false,isError:true,error:error});
        }
        else{
            return res.json({success:true,message:"Service added successfully",service:service});
        }
    })
}

module.exports=[createService];