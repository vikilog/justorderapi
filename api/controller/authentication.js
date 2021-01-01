const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('config'); // get our config file

let authentication = (request, response, next) => {

    // check header or url parameters or post parameters for token
    const token = request.body.token || request.query.token || request.headers['x-access-token'];

    // decode token
    if (token) {
        console.log(token);
        // verifies secret and checks exp
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return response.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                request.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return response.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
};

module.exports = authentication;
