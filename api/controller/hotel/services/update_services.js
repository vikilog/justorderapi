const serviceModel = require('../../../models/services');
const mongoose = require('mongoose');


let updateService = (req, res, next) => {
    let condition = {
        hotelid: mongoose.Types.ObjectId(req.decoded._id),
        _id:mongoose.Types.ObjectId(req.params.serviceId)
    };   
    serviceModel.updateOne(condition,{$set:req.body} ,(error, services) => {
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
                message: "Services updated successfully",
                services: services
            })
        }
    });
};

module.exports = [updateService];