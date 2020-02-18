const config = require("../configurations/config");
const basePath = '/api'
const request = require('request');
var services = {};

services.generateToken = (postData) => {
    return new Promise((resolve, reject) => {
        var uri = config.CLIENT_SERVICE_CONFIG.JWT_SERVICE + basePath + '/generateToken';
        var options = {
            method: 'post',
            body: postData,
            json: true,
            url: uri
          }
          request(options, function (err, res, body) {
            if (err) {
              console.error('error posting json: ', err)
              throw err
            }
            // console.log('body: ', body)
            resolve(body.result);
          })
    })
    
}

module.exports = services;