const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let country=new Schema({
    countryname:{type:String},
    created:Date
});

module.exports=mongoose.model('country',country);