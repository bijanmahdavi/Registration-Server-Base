const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUser = AmazonCognitoIdentity.CognitoUser;
const AuthenticationDetails = AmazonCognitoIdentity.AuthenticationDetails;
const CognitoUserAttribute = AmazonCognitoIdentity.CognitoUserAttribute;
const { userPool, poolData } = require('../cognitoConfig');
const AWS = require('aws-sdk');
const { aws } = require('../config'); // Make sure to use the correct path to your config.js file

// Set up the AWS credentials
AWS.config.update({
  accessKeyId: aws.accessKeyId,
  secretAccessKey: aws.secretAccessKey,
  region: poolData.region,
});

function registerUser(username, email, phone_number, password) {
  return new Promise((resolve, reject) => {
    const attributeList = [];

    if (email) {
      attributeList.push(
        new CognitoUserAttribute({
          Name: 'email',
          Value: email,
        }),
      );
    }

    if (phone_number) {
      attributeList.push(
        new CognitoUserAttribute({
          Name: 'phone_number',
          Value: phone_number,
        }),
      );
    }

    userPool.signUp(username, password, attributeList, null, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function loginUser(username, password) {
  return new Promise(async (resolve, reject) => {
    const cognito = new AWS.CognitoIdentityServiceProvider({
      region: poolData.region,
    });

    const params = {
      AuthFlow: 'ADMIN_NO_SRP_AUTH',
      ClientId: poolData.ClientId,
      UserPoolId: poolData.UserPoolId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    };

    try {
      const result = await cognito.adminInitiateAuth(params).promise();
      if (result.AuthenticationResult) {
        resolve(result.AuthenticationResult);
      } else {
        reject(new Error('Error logging in user.'));
      }
    } catch (error) {
      reject(error);
    }
  });
}

function logoutUser(cognitoUser) {
  return new Promise((resolve, reject) => {
    cognitoUser.signOut();
    resolve();
  });
}

module.exports = { registerUser, loginUser, logoutUser };
