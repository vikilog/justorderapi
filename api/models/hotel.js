const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let AutoIncrement = require('mongoose-sequence')(mongoose);

let hotelSchema=new Schema({
    id: { type: Number },
    role:{type:String,default:'hotel'},
    hotelname: { type: String, index: 'text' },
    hotelemail: { type: String, index: 'text' },
    hotelphone: { type: String },
    password: { type: String },
    citydistance:{type:String},
    isAdmin:{type:Boolean,default:true},
    isActive:{type:Boolean,default:true},
    isDeleted:{type:Boolean,default:false},
    description:{type:String,default:"Add a description"},
    owneremail:{type:String},
    ownerphone:{type:String},
    hoteladdress:{type:String},
    hotelrating:{type:String},
    hotelstatus:{type:String},
    hotelparking:{type:String},
    bedandbreakfast:{type:String},
    country:{type:String},
    region:{type:String},
    city:{type:String},
    balcony:{type:String},
    addedby:{type:String},   
    hotelimage:{type:String,default:"default.jpg"},
    created: Date,
    updated: Date,
    token:{type:String}
});

hotelSchema.plugin(AutoIncrement, { inc_field: 'id', id: "hotelId" });
module.exports=mongoose.model('hotel', hotelSchema);