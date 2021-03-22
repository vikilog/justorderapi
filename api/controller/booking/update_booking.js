const bookingModel = require('../../models/booking');

let updateBooking = (req, res, next) => {
    bookingModel.updateOne({
        'hotelid': req.decoded._id,
        '_id': req.params.bookingId
    }, { $set: req.body }, (error, result) => {
        if (error) {
            
            return res.json({
                success: false,
                isError: true,
                error: error
            });
        }
        else {
            console.log(result);
            if (result.nModified == 1) {
                next();
            }
            else {
                return res.json({
                    success: false,
                    isError: true,
                    message: "Unable to update booking"
                });
            }
        }
    });
};

let updateTime = (req, res, next) => {

    bookingModel.update({
        'hotelid': req.decoded._id,
        '_id': req.params.bookingId
    }, { $set: { updated: Date.now() } }, (error, result) => {
        if (error) {
            return res.json({
                success: false,
                isError: true,
                error: error
            });
        }
        else {
            console.log(result);
            if (result.nModified == 1) {
                return res.json({
                    success: true,
                    message: "Booking updated successfully"
                });
            }
            else {
                return res.json({
                    success: false,
                    isError: true,
                    message: "Unable to update booking"
                });
            }
        }
    });
}

module.exports = [
    updateBooking,
    updateTime
];