const mongoose = require('mongoose');
const config = require("config");

// =======================
// configuration =========
// =======================
const port = config.PORT || 8000; // used to create, sign, and verify tokens
mongoose.connect(config.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,   
}); // connect to database


mongoose.set('useFindAndModify', false);
mongoose.set('debug', true);

const database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', () => {
    // we're connected!
    console.log("we're connected!");
});
