const restaurantModel=require('../../models/restaurant');
const config=require('config');

let findRestaurants=(req,res,next)=>{
    let conditions=[
        {
            "$match":{
               "$expr":{
                createdby:req.decoded._id
               }
            }
        },
        // {
        //     '$addFields': {
        //         'hotelimage': {
        //             '$concat': [
        //                 `${config.fileUrl}/hotels/`, {
        //                     '$cond': {
        //                         'if': {
        //                             '$eq': [
        //                                 '$imageurl', 'hotel.png'
        //                             ]
        //                         },
        //                         'then': '$imageurl',
        //                         'else': {
        //                             '$concat': [
        //                                 {
        //                                     '$toString': '$id'
        //                                 }, '/', '$imageurl'
        //                             ]
        //                         }
        //                     }
        //                 }
        //             ]
        //         }
        //     }
        // }, 
        // {
        //     "$project":{
        //         "password":0
        //     }
        // }
    ];
    restaurantModel.aggregate(conditions,(error,resaurants)=>{
        if(error){
            console.error(error);
            return res.send({
                success:false,
                isError:true,
                error:error
            })
        }
        else{
            console.log(req.decoded);
            return res.send({
                success:true,
                message:"List of restaurants",
                resaurants:resaurants
            })
        }
    });
}




module.exports=[findRestaurants];