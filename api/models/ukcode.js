const mongoose=require('mongoose');
const Schema=mongoose.Schema;
let AutoIncrement = require('mongoose-sequence')(mongoose);

let ukSchema=new Schema({
    id:{type:Number},
    regionname:{type:String},
    countryname:{type:String},
    code:{type:String},
    townarea:{type:String},
    createdby:{type:Schema.Types.ObjectId}
});

ukSchema.plugin(AutoIncrement, { inc_field: 'id', id: "ukcodeId" });
module.exports=mongoose.model('ukcode', ukSchema);