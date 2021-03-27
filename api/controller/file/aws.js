const AWS=require('aws-sdk');
const cred=require('../../utility/cred');

AWS.config.update({
    accessKeyId: cred.aws.ACCESS_KEY_ID,
    secretAccessKey:cred.aws.SECRET_ACCESS_KEY,
    signatureVersion:'v4',
    region:"us-east-2"
  });

  module.exports =new AWS.S3();

  
