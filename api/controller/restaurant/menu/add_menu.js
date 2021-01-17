// const menuModel=require('../../model/menu');

// let addMenu=(req,res,next)=>{
//     let menu={
//         restaurantId:req.decoded._id,
//         restaurantid:req.decoded.id,
//         name:req.body.name,
//         menuno:req.body.menuno,
//         title:req.body.title,
//         repeat:req.body.repeat,
//         issize:req.body.issize,
//         discount:req.body.discount,
//         otherlangtitle:req.body.otherlangtitle,
//         price:req.body.price,

//     };
//     menuModel.create(menu,(error,menu)=>{
//         if(error){
//             console.error(error);
//             return res.send({
//                 success:false,
//                 isError:true,
//                 error:error
//             });
//         }
//         else {
//             return res.send({
//                 success:true,
//                 message:"Menu added Successfully",
//                 menu:menu
//             });
//         }
//     });
// }

// module.exports=[addMenu];