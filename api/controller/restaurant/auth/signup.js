let userModel = require('../../../models/restaurant');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('config'); // get our config file
const utility = require('../../../utility/utility');

let checkUserExist = (req, res, next) => {
    userModel.find(
        { email: req.body.email },
        (err, user) => {
            if (err) {
                return res.json({ success: false, isError: true, error: err });
            } else {
                if (user.length > 0) {
                    return res.json({ success: false, message: 'Email already exists. Choose another email.' });
                } else {
                    next();
                }
            }
        }
    );
};

let genrateHashPassword = (req, res, next) => {

    utility.hash(req.body.password, (err, hashPassword) => {
        if (err) {
            return res.json({ success: false, isError: true, error: err });
        } else {
            req.data = {};
            req.data.hashPassword = hashPassword;
            next();
        }
    });
};

let createUser = (req, res, next) => {
    let user = req.body;
    let userPayload = {
        email: user.email,
        password: req.data.hashPassword,
        address:user.address,
        mobile:user.mobile,
        city:user.city,
        country:user.country,
        areacode:user.areacode,
        createdby:req.decoded._id
    };
    userModel.create(
        userPayload,
        (err, user) => {
            if (err) {
                return res.json({ success: false, isError: true, error: err });
            } else {
                req.data.createdUser = JSON.parse(JSON.stringify(user));
                next();
            }
        });
};

let generateToken = (req, res) => {
    const payload = {
        email: req.data.createdUser.email,
        _id: req.data.createdUser._id,
        id: req.data.createdUser.id,
    };
    const token = jwt.sign(payload, config.secret, {
        expiresIn: config.tokenDuration // expires in 24 hours
    });

    delete req.data.createdUser.password;

    // return the information including token as JSON
    res.json({
        success: true,
        message: 'Restaurants added successfully.',
        //token: token,
        //user: req.data.createUser
    });

};


module.exports = [
    checkUserExist,
    genrateHashPassword,
    createUser,
    generateToken
];
