module.exports = {
    "get": {
        "security": [{ "authorization": [] }],
        "tags": [
            "AUTHORIZATION"
        ],
        "summary": "verify token",
        "responses": {
            "200": {
                "description": "OK"
            },
            "500": {
                "description": "Error occured while verfiy tokens"
            }
        }
    }
}