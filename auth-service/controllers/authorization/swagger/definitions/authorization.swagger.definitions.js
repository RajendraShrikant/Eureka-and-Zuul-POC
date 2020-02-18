module.exports = {
    "required": [
        "email",
        "password"
    ],
    "properties": {
        "email": {
            "type": "string",
            "uniqueItems": true
        },
        "password": {
            "type": "string",
            "uniqueItems": false
        }
    }
}