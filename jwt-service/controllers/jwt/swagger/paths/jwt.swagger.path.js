module.exports = {
    "post": {
        "tags": [
            "AUTHORIZATION"
        ],
        "summary": "Token generate",
        "description": "Login and authorize user from the system",
        "parameters": [{
            "name": "auth",
            "in": "body",
            "description": "Email needed to generate token",
            "schema": {
                "$ref": "#/definitions/Auth"
            }
        }],
        "produces": [
            "application/json"
        ],
        "responses": {
            "200": {
                "description": "Token generated success."
            },
            "500": {
                "description": "Error in generate token."
            }
        }
    }
}