// config.js
require('dotenv').config();

module.exports = {
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-2',
  },
  cognito: {
    UserPoolId: 'us-east-2_gjMTnQVbe',
    ClientId: '78reffod9530ta1pd2f5si6728',
  },
};
