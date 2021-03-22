const mongoose=require('mongoose');
const Schema=mongoose.Schema;
let AutoIncrement = require('mongoose-sequence')(mongoose);

let menuOptionSchema=new Schema({
    menuId:{type:Schema.Types.ObjectId},
    restaurantId:{type:Schema.Types.ObjectId},
    options:[{
        heading:{type:String},
        multiple:{type:Boolean},
        opt:[{
            description:{type:String},
            price:{type:Number},
            optionNumber:{type:Number},
            otherLangTitle:{type:String},
            name:{type:String}
        }]
    }], 
})

menuOptionSchema.plugin(AutoIncrement, { inc_field: 'id', id: "menuOptionId" });
module.exports=mongoose.model('menuOption', menuOptionSchema);