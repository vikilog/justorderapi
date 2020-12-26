let hotelModel = require('../../models/hotel');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('../../config/default.json'); // get our config file
const utility = require('../../utility/utility');
const rooms=require('../../models/rooms');


let checkHotelExist = (req, res, next) => {
    hotelModel.find(
        { email: req.body.hotelemail },
        (err, hotel) => {
            if (err) {
                return res.json({ success: false, isError: true, error: err });
            } else {
                if (hotel.length > 0) {
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

let createHotel = (req, res, next) => {
    let hotel = req.body;  
    console.log(hotel);  
    let hotelPayload = {
        hotelemail: hotel.hotelemail,
        password: req.data.hashPassword,
        hotelname:hotel.hotelname,   
        hotelphone:hotel.hotelphone,    
        citydistance:hotel.citydistance,
        owneremail:hotel.owneremail,
        ownerphone:hotel.ownerphone,
        hoteladdress:hotel.hoteladdress,
        hotelrating:hotel.hotelrating,
        hotelstatus:hotel.hotelstatus,
        hotelparking:hotel.hotelparking,
        bedandbreakfast:hotel.bedandbreakfast,
        balcony:hotel.balcony,        
        created: Date.now(),
        updated: Date.now(),
        country:hotel.country,
        region:hotel.region,
        city:hotel.city,
        addedby:hotel.addedby
    }  ; 
    hotelModel.create(
        hotelPayload,
        (err, hotel) => {
            if (err) {
                return res.json({ success: false, isError: true, error: err });
            } else {
                console.log(hotel);
                req.data.createdUser = JSON.parse(JSON.stringify(hotel));
                next();
            }
        });
};

let generateToken = (req, res,next) => {
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
        message: 'Hotel registered successfully.',
        token: token,
        user: req.data.createUser,
        rooms:req.data.rooms
    });

};




module.exports = [
    checkHotelExist,
    genrateHashPassword,
    createHotel,
    //createRoom,  
    generateToken
];