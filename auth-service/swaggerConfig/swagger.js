const config = require("../configurations/config");

module.exports = {
    "swagger": config.SWAGGER_CONFIG.SWAGGER,
    "info": {
        "version": config.SWAGGER_CONFIG.INFO.VERSION,
        "title": config.SWAGGER_CONFIG.INFO.TITLE,
        "description": config.SWAGGER_CONFIG.INFO.DESCRIPTION,
        "license": {
            "name": "MIT",
            "url": "https://opensource.org/licenses/MIT"
        }
    },
    "host": config.SWAGGER_CONFIG.HOST,
    "basePath": config.SWAGGER_CONFIG.BASEPATH,
    "tags": require("./tags"),
    "schemes": config.SWAGGER_CONFIG.SCHEMES,
    "securityDefinitions": {
        "authorization": {
            "type": 'apiKey',
            "name": 'x-access-token',
            "in": 'header',
            "description": 'The following syntax must be used in the "Authorization" header xxxxxx.yyyyyyy.zzzzzz'
        }
    },
    "consumes": config.SWAGGER_CONFIG.CONSUMES,
    "produces": config.SWAGGER_CONFIG.PRODUCES,
    "paths": require("./paths"),
    "definitions": require("./definitions")
}