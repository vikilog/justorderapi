const mongoose=require('mongoose');
const Schema=mongoose.Schema;
let AutoIncrement = require('mongoose-sequence')(mongoose);

let regionSchema=new Schema({
    id:{type:Number},
    regionname:String,
    countryname:String
});

regionSchema.plugin(AutoIncrement, { inc_field: 'id', id: "regionId" });
module.exports=mongoose.model('region', regionSchema);