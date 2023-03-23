'use strict'
const awsSecret = require('SecresManager');

exports.handler = async (event) => {
        
    // TODO implement
    let credenciales= await awsSecret.getSecretValue();
    console.log('user->', credenciales.user);
    console.log('user->', credenciales.passw);

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};