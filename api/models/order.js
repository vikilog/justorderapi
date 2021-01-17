const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let AutoIncrement = require('mongoose-sequence')(mongoose);

let orderSchema = new Schema({
    address: { type: String },
    status: {
        type: String
    },
    time: {
        type: String
    },
    totalprice: {
        type: String
    },
    transactionId: {
        type: String
    },
    uid: {
        type: String
    },
    name: {
        type: String
    },
    options: {
        type: String
    },
    message: {
        type: String
    },
    order: {
        type: String
    },
    ordertime: {
        type: String
    },
    paymentstatus: {
        type: String
    },
    phone: {
        type: String
    },
    payment: {
        type: String
    },
    date: {
        type: String
    },
    deliverypostcode: {
        type: String
    },
    extra: {
        type: Array
    },
    coupen: {},
    comment: {
        type: String
    },
    cardnumber: {
        type: String
    },
    userpostcode: {
        type: String
    },
    discount: {
        type: Number
    }
    },
    {
        timestamps:true
    }
);

orderSchema.plugin(AutoIncrement, { inc_field: 'id', id: "orderId" });
module.exports = mongoose.model('orders', orderSchema);