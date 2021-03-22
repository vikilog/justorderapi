const serviceAccount = require("../key/serviceAccount.json");
var admin = require("firebase-admin");
const userModel=require('../models/user');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://events-3ffd5.firebaseio.com"
});


let sendNotifications = (data, callback) => {
    let message = {
        data: {
            title: data.title,
            body: data.body,
            message: data.message,
            // payload : data.payload,
            click_action: 'FLUTTER_NOTIFICATION_CLICK',
        },
        notification: {
            title: data.title,
            body: data.body,
        },
        token: data.deviceToken
    };
    fcm.messaging().send(message).then(res => {
        callback(null, res);
    }).catch(error => {
        callback(error);
    });
};

module.exports.updateNotification = (reqData, callback) => {
    let conditions = {
        _id: mongoose.Types.ObjectId(reqData.userId)
    }
    userModel.findOne(conditions, (err, user) => {
        if (err) {
            console.log(err);
            return res.json({ success: false, isError: true, error: err });
        } else {
            let notificationData = {
                title: '',
                body: reqData.notificationData.body,
                message: reqData.notificationData.message,
                deviceToken: user.deviceId ? user.deviceId : null,
                payload: reqData.notificationData.payload
            }

            let notification = {
                userId: user._id,
                title: notificationData.title,
                body: notificationData.body,
                message: notificationData.message,
                views: notificationData.payload.linkTo,
                payload: notificationData.payload,
                linkTo: notificationData.payload.linkTo,
                type: notificationData.payload.type,
                created: Date.now(),
                updated: Date.now(),
            }
            notificationModel.create(notification, (err, notificationRes) => {
                if (err) {
                    callback(err);
                } else {
                    if (notificationData.deviceToken) {
                        sendNotifications(notificationData, (err, res) => {
                            if (err) {
                                callback(err);
                            } else {
                                callback(null, res);
                            }
                        })
                    } else {
                        console.log('Device id not found.')
                    }
                }
            });
        }
    });
}