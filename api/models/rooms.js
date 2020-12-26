const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let AutoIncrement = require('mongoose-sequence')(mongoose);

let roomSchema=new Schema({
    id: { type: Number },
    hotelId:{type:String},    
    singleKid:{type:String,default:"0"},
    singleAdult:{type:String,default:"0"},
    doubleKid:{type:String,default:"0"},
    doubelAdult:{type:String,default:"0"},
    duplexKid:{type:String,default:"0"},
    duplexAdult:{type:String,default:"0"},
    dulexKid:{type:String,default:"0"},
    dulexAdult:{type:String,default:"0"},
    singleRoom:{type: String,default:"No"},
    doubleRoom:{type: String,default:"No"},
    duplexRoom:{type: String,default:"No"},
    dulexRoom:{type: String,default:"No"},   
    singleRoomImage:{type:String,default:"default.jpg"},
    doubleRoomImage:{type:String,default:"default.jpg"},
    duplexRoomImage:{type:String,default:"default.jpg"},
    dulexRoomImage:{type:String,default:"default.jpg"},
    created:{type:Date,default:Date.now()},
    updated: {type:Date,default:Date.now()},
});

roomSchema.plugin(AutoIncrement, { inc_field: 'id', id: "roomId" });
module.exports=mongoose.model('room', roomSchema);