'use strict'
const AWS = require("aws-sdk");
const region ="us-east-1"

const client=new AWS.SecretsManager({region:region});
                   //{SecretId:'SecretManagerTest'}, (err, data) => 
                   //{SecretId:'SecretCustomWithRoles'}, (err, data) =>
function getSecretValue(){
    
    return new Promise
    (
        (resolve, reject) =>
        {
            
            
               client.getSecretValue
               (

                   {SecretId:'SecretVideo'}, (err, data) => 
                   {
                       
                       if(err){
                           reject(err);
                       }
                       else{
                           if('SecretString' in data){
                               resolve(JSON.parse(data.SecretString));
                           }
                           else
                           {
                               const buff = new Buffer(data.SecretBinary,'base64');
                               resolve(JSON.parse(buff.toString('ascii')));
                           }
                           
                       }
                       
                       
                   }
             )
        }
    );
}

exports.getSecretValue= getSecretValue
