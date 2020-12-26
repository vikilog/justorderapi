let bcrypt = require('bcrypt');
let saltRounds = 10;
let jwt = require('jsonwebtoken');

module.exports.hash = (password, callback) => {
    bcrypt.genSalt(saltRounds,
        (err, salt) => {
            bcrypt.hash(password, salt,
                (err, hash) => {
                    callback(err, hash);
                });
        });
};


module.exports.generateOTP = () => {

    // Declare a string variable  
    // which stores all string 
    var string = '123456789';
    let OTPLength = 4;
    let OTP = '';

    // Find the length of string 
    var len = string.length;
    for (let i = 0; i < OTPLength; i++) {
        let index = Math.floor(Math.random() * len);
        OTP += string[index];
    }
    return OTP;
}

module.exports.checkHashPassword = (password, hash, callback) => {
    bcrypt.compare(password, hash,
        (err, res) => {
            callback(err, res);
        });
};
