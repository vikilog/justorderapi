const mongoose=require('mongoose');
const Schema=mongoose.Schema;
let AutoIncrement = require('mongoose-sequence')(mongoose);

let menuSchema=new Schema({
    id:{type:Number},    
    restaurantid:{type:Number},
    restaurantId:{type:Schema.Types.ObjectId},
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
            imageUrl:{type:String},
            isSize:{type:Boolean,default:false},
            discount:{type:Number},
            otherLangTitle:{type:String},
            price:{type:Number},    
            repeat:{type:Number,default:1},
            title:{type:String},
            size:{type:Array,default:[]},
            options:{type:Array,default:[]},  
        }
    ],    
    },
    {
        timestamps:true
    }
);




menuSchema.plugin(AutoIncrement, { inc_field: 'id', id: "menuId" });
module.exports=mongoose.model('menus', menuSchema);