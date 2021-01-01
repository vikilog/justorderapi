const serviceModel = require('../../../models/services');
const mongoose = require('mongoose');


let deleteservice = (req, res, next) => {
    let condition = {
        hotelid: mongoose.Types.ObjectId(req.decoded._id),
        _id:mongoose.Types.ObjectId(req.params.serviceId)
    }
    serviceModel.deleteOne(condition, (error, services) => {
        if (error) {
            return res.json({
                success: false,
                isError: true,
                error: error
            });
        }
        else {
            return res.json({
                success: true,
                message: "Services deleted successfully",
                services: services
            })
        }
    });
};

module.exports = [deleteservice];