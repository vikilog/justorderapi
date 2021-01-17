const mongoose=require('mongoose');
const Schema=mongoose.Schema;
let AutoIncrement = require('mongoose-sequence')(mongoose);

let menuSchema=new Schema({
    id:{type:Number},
    name:String,
    restaurantid:{type:Number},
    restaurantId:{type:Schema.Types.ObjectId},
    category:{type:String},
    menuno:{type:Number},
    discription:{type:String},
    issize:{type:Boolean,default:false},
    discount:{type:Number},
    otherlangtitle:{type:String},
    price:{type:Number},
    repeat:{type:Number},
    title:{type:String},
    size:{type:Array,default:[]},
    options:{type:Array,default:[]},   
    },
    {
        timestamps:true
    }
);




menuSchema.plugin(AutoIncrement, { inc_field: 'id', id: "menuId" });
module.exports=mongoose.model('menus', menuSchema);