let customerModel = require('../../models/user');
// const config = require('config'); // get our config file
let mongoose = require('mongoose');

let getUserDetail = (req, res) => {
    let conditions = [{
        '$match': {
            "_id": mongoose.Types.ObjectId(req.decoded._id),
        }
    }, 
    ]
    customerModel.aggregate(
        conditions,
        (err, userDetail) => {
            if (err) {
                console.log(err);
                return res.json({ success: false, isError: true, error: err });
            } else {
                if (userDetail.length > 0) {
                    userDetail[0].password = 0;
                    return res.json({ success: true, message: "Details of the given user as per the user Id.", user: userDetail });
                } else {
                    return res.json({ success: false, message: "No user exists for the given user Id." });
                }
            }
        });
};

module.exports = getUserDetail;
