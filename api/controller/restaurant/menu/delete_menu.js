// const menuModel=require('../../model/menu');

// let deleteModel=(req,res,next)=>{
//     menuModel.findOneAndDelete({_id:req.params.menuId},(error,menu)=>{
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
//                 message:"Menu deleted Successfully",              
//             });
//         }
//     });
// }

// module.exports=[deleteModel];