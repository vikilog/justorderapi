let mongoose = require('mongoose');
let hotelModel = require('../../models/hotel');

let updateDeviceId = (req, res) => {
    hotelModel.updateOne({ _id: mongoose.Types.ObjectId(req.decoded._id) },
        {
            $set: {
                token: req.params.deviceId
            }
        },
        (err, userRes) => {
            if (err) {
                console.log(err);
                return res.json({ success: false, isError: true, error: err });
            } else {
                if (userRes.nModified == 1 || userRes.n == 1 || userRes.ok == 1 ) {
                    return res.json({ success: true, message: "Device ID updated successfully." })
                }
                else {
                    return res.json({ success: false, message: "Device ID is unable to update." })
                }
            }
        });
}

module.exports = [
    updateDeviceId
]