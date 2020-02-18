module.exports = {
    "post": {
        "tags": [
            "AUTHORIZATION"
        ],
        "summary": "Login and authorize user",
        "description": "Login and authorize user from the system",
        "parameters": [{
            "name": "auth",
            "in": "body",
            "description": "Email and password to login",
            "schema": {
                "$ref": "#/definitions/Auth"
            }
        }],
        "produces": [
            "application/json"
        ],
        "responses": {
            "200": {
                "description": "User authorization and login success."
            },
            "500": {
                "description": "Error in authorization and login."
            }
        }
    }
}