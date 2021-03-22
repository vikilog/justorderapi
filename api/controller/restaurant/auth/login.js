const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const userModel = require('../../../models/restaurant');
const config = require('config'); // get our config file
const utility = require('../../../utility/utility');

let login = (req, res, next) => {
    // find the user
    userModel.findOne({
        email: req.body.email
    }, (err, user) => {       
        if (err) {
            return res.json({ success: false, isError: true, error: err });
        } else if (!user) {
            return res.json({ success: false, message: 'no user exists' });
        } else if (user) {
            req.data = {};
            req.data.user = JSON.parse(JSON.stringify(user));
            next();
        }
    });
};

let comparePassword = (req, res, next) => {
    utility.checkHashPassword(req.body.password, req.data.user.password, 
        (err, isMatch) => {
        if (err) {
            return res.json({ success: false, isError: true, error: err });
        } else {
            if (isMatch) {
                next();
            } else {
                return res.json({ success: false, isError: true, message: 'You have enterd wrong email or password.'});
            }
        }
    });
};

let generateToken = (req, res) => {  
    const payload = {
        email: req.data.user.email,
        _id: req.data.user._id,
        id: req.data.user.id,
        role:req.data.user.role,
        isAdmin:req.data.user.isAdmin,
    };
    const token = jwt.sign(payload, config.secret, {
        expiresIn: config.tokenDuration // expires in 24 hours
    });

    delete req.data.user.password;

    // return the information including token as JSON
    res.json({
        success: true,
        message: 'You are logged in successfully.',
        token: token,
        user: req.data.user
    });

};

module.exports = [
    login,
    comparePassword,
    generateToken
];
