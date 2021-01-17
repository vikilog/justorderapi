// const menuModel=require('../../model/menu');

// let updateModel=(req,res,next)=>{
//     let conditions={
//         _id:req.params.menuId
//     };
//     let updateData={
//         $set:req.body
//     };
//     menuModel.findByIdAndUpdate(conditions,updateData,{new:true},(error,updateRes)=>{
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
//                 message:"Menu updated Successfully",
//                 menu:menu
//             });
//         }
//     });
// }

// module.exports=[updateModel];