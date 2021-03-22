const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let AutoIncrement = require('mongoose-sequence')(mongoose);

let restaurantSchema = new Schema({
    id: { type: Number },
    name: { type: String },
    role:{type:String,default:'restaurant'},
    email: { type: String, lowercase: true, unique: true, required: true },
    password: { type: String, required: true },
    address: { type: String },
    mobile: { type: String },
    imageurl: { type: String, default: 'default.jpg' },
    areacode: { type: String, required: true },
    region: { type: String },
    country: { type: String },
    city: { type: String },
    descriptions:{type:String},
    ios:{type:String},
    android:{type:String},
    isAdmin: { type: Boolean, default: true },
    createdby: { type: Schema.Types.ObjectId },
    coupon: [{
        code: { type: String },
        percentDiscount: { type: Number }
    }],
    timing:[
        {
            day:{type:String},
            dayOff:{type:Boolean,default:false},
            from:{type:String},
            to:{type:String}

        }
    ],
    category:[
        {
            categoryName:{type:String}
        }
    ],
    menus:[
        {   
            categoryId:{type:Schema.Types.ObjectId},
            menuNo:{type:Number},
            description:{type:String},
            imageUrl:{type:String,default:''},
            isSize:{type:Boolean,default:false},
            discount:{type:Number},
            otherLangTitle:{type:String},
            price:{type:Number},    
            repeat:{type:Number,default:1},
            title:{type:String},
            soldOut:{type:Boolean,default:false},
            size:[{
                title:{type:String},
                price:{type:String}
            }],             
        }
    ],    
    appColor:{type:String},
    webColor:{type:String},
    deliveryCharge: { type: Number, default: 0.0 },
    serviceCharge: { type: Number, default: 0.0 },
    orderLimit: { type: Number, default: 10 },
    status: { type: Boolean, default: true },
    cardStatus: { type: Boolean, default: true },
    token: { type: String },
    isActive:{type:Boolean,default:true},
    collectStatus:{type:Boolean,default:true},
    deliveryStatus:{type:Boolean,default:true},
    token:{type:String}
},
    {
        timestamps: true
    },
);




restaurantSchema.plugin(AutoIncrement, { inc_field: 'id', id: "restaurantId" });
module.exports = mongoose.model('restaurants', restaurantSchema);