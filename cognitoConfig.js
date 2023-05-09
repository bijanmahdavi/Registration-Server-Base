const { CognitoUserPool } = require('amazon-cognito-identity-js');

const poolData = {
  UserPoolId: 'us-east-2_gjMTnQVbe',
  ClientId: '78reffod9530ta1pd2f5si6728',
  region: 'us-east-2',
};

const userPool = new CognitoUserPool(poolData);

module.exports = {
  userPool,
  poolData,
};
