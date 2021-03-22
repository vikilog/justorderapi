const hotelModel=require('../../models/hotel');
const util=require('../../utility/utility');

let findHotel=(req,res,next)=>{
    hotelModel.find({_id:req.decoded._id},(error,hotel)=>{
        if(error){
            console.log(error);
            return res.json({success:false,isError:true,error:error});
        }
        else{
            req.data={};
            req.data.hotel=hotel;
            next();
        }
    });
}

let comparePassword = (req, res, next) => {
    console.log(req.data);
    util.checkHashPassword(req.body.oldpassword, req.data.hotel[0].password, 
        (err, isMatch) => {
        if (err) {
            console.log(err);
            return res.json({ success: false, isError: true, error: err });
        } else {
            if (isMatch) {
                next();
            } else {
                return res.json({ success: false, isError: true, message: 'You have enterd wrong email or password.'});
            }
        }
    });
};

let genrateHashPassword = (req, res, next) => {

    util.hash(req.body.newpassword, (err, hashPassword) => {
        if (err) {
            console.log(erorr);
            return res.json({ success: false, isError: true, error: err });
        } else {           
            req.data.hashPassword = hashPassword;
            next();
        }
    });
};

let updatePassword=(req,res,next)=>{
    hotelModel.updateOne({_id:req.decoded._id},{$set:{password:req.data.hashPassword}},(error,result)=>{
        if (error) {
            console.log(erorr);
            return res.json({ success: false, isError: true, error: error });
        } else {
            if(result.nModified==1){
                return res.json({
                    success:true,
                    "message":"Password changed successfully",
                    result:result
                });  
            }
            else{
                return res.json({
                    success:false,
                    "message":"Unable to update Password",
                    result:result
                });
            }
        }
    })
}

module.exports=[
    findHotel,
    comparePassword,
    genrateHashPassword,
    updatePassword
];