const bookingModel=require('../../models/booking');
const mongoose=require('mongoose');

let findBooking=(req,res,next)=>{
    let conditions=[
        {
            "$match":{
               "$expr":{                    
                        
                          "$eq":[
                              {
                                "roomtype":req.params.roomtype
                              },
                              {
                                "hotelid":`${ mongoose.Types.ObjectId(req.decoded._id)}`
                              }
                              
                          ] , 
                    
                        
                           
                        
                    
                }
               
            },
            
        },
        {
            "$lookup":{
                'from':'services',
                'let':{
                    'hotelid':`${req.decoded._id}`,
                    'servicename':`${req.params.roomtype}`
                },
                "$pipeline":[
                    {
                        "$match":{
                            "$expr":{
                                "$and":[
                                    {
                                        "$eq":[
                                            '$hotelid',"$hotelid"
                                        ]
                                    },
                                    {
                                        "$eq":[
                                            '$servicename','$servicename'
                                        ]
                                    }
                                   
                                ]
                            }
                        }
                    }
                ],
                'as':'services'
            }
        },
        {
            "$project":{
                "booking":1,
                "services":1
            }
        }
    ];
    console.log(conditions);

    bookingModel.aggregate(conditions,(error,bookings)=>{
        if(error){
            console.log(error);
            return res.json({
                success:false,
                isError:true,
                error:error
            });
        }
        else{
            return res.json({
                success:true,               
                bookings:bookings
            });
        }
    });
}



module.exports=[
    findBooking
];