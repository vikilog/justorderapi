const mongoose=require('mongoose');
const Schema=mongoose.Schema;
let AutoIncrement = require('mongoose-sequence')(mongoose);

let bookingSchema=new Schema({
    id: { type: Number },
    name:{type:String},
    description:{type:String},
    checkin:{type:String},
    checkout:{type:String,ref:'hotel'},
    hotelid:{type:Schema.Types.ObjectId,},
    roomtype:{type:String},
    created:{type:Date},
    updated:{type:Date},
});
bookingSchema.plugin(AutoIncrement, { inc_field: 'id', id: "bookingId" });
module.exports=mongoose.model('bookings', bookingSchema);
