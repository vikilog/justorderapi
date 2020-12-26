const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let AutoIncrement = require('mongoose-sequence')(mongoose);

let userSchema = new Schema({
    id: { type: Number },
    password: { type: String },
    name: { type: String, index: 'text' },
    email: { type: String, index: 'text' },
    mobile: { type: String },
    country: { type: String,default:"UK"},
    city: { type: String },
    address:{type:String},
    postcode:{type:String},
    image: { type: String, default: 'profile.png' },
    created: Date,
    updated: Date,
});




// set up a mongoose model and pass it using module.exports
userSchema.plugin(AutoIncrement, { inc_field: 'id', id: "userId" });
module.exports = mongoose.model('user', userSchema);
