const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let AutoIncrement = require('mongoose-sequence')(mongoose);

let areaCodeSchema=new Schema({
    id: { type: Number },
    code:{type:String},
    regionname:{type:String},
    country:{type:String},
    createdby:{type:Schema.Types.ObjectId}
});

areaCodeSchema.plugin(AutoIncrement, { inc_field: 'id', id: "areacodeId" });
module.exports=mongoose.model('areacode', areaCodeSchema);