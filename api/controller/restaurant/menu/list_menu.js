// const menuModel=require('../../model/menu');

// let addModel=(req,res,next)=>{
//     menuModel.find({restaurauntId:req.docoded._id},(error,menu)=>{
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
//                 message:"Menu List",
//                 menus:menu
//             });
//         }
//     });
// }

// module.exports=[addModel];