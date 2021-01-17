const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let AutoIncrement = require('mongoose-sequence')(mongoose);

let restaurantSchema = new Schema({
    id: { type: Number },
    name: String,
    email: { type: String, lowercase: true, unique: true, required: true },
    password: { type: String, required: true },
    address: { type: String },
    mobile: { type: String },
    imageurl: { type: String, default: 'hotel.png' },
    areacode: { type: String, required: true },
    city: { type: String },
    country: { type: String },
    createdby: { type: Schema.Types.ObjectId },
    coupns: [{
        'code': { type: String },
        'percentdiscount': { type: Number }
    }],
    admin: [
        {
            'adminemail': { type: String },
            'adminpassword': { type: String }
        }
    ],
    charges:[
        {
            deliverycharge:{type:String,default:"0.0"},
            servicecharge:{type:String,default:"0.0"},
            orderlimit:{type:String,default:"09"}
        }
    ],
    status:{type:Boolean,default:true},
    cardstatus:{type:Boolean,default:true},
    token:{type:String}
    },
    {
        timestamps: true
    },
);




restaurantSchema.plugin(AutoIncrement, { inc_field: 'id', id: "restaurantId" });
module.exports = mongoose.model('restaurants', restaurantSchema);