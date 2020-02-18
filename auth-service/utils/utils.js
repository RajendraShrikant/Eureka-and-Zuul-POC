const config = require("../configurations/config");
const crypto = require('crypto');

var utils = {};

utils.getEncryptedText = (decryptedText) => {
    let encryptedKey = crypto.createCipher(config.APPP_CONFIG.SECURITY.ENCRYPTION_ALGORITHM, config.APPP_CONFIG.SECURITY.ENCRYPTION_KEY);
    let encryptedText = encryptedKey.update(decryptedText, 'utf8', 'hex');
    encryptedText += encryptedKey.final('hex');
    return encryptedText;
}

utils.getdecryptedText = (encryptedText) => {
    let decryptedKey = crypto.createDecipher(config.APPP_CONFIG.SECURITY.ENCRYPTION_ALGORITHM, config.APPP_CONFIG.SECURITY.ENCRYPTION_KEY);
    let decryptedText = decryptedKey.update(encryptedText, 'hex', 'utf8')
    decryptedText += decryptedKey.final('utf8');
    return decryptedText;
}

module.exports = utils;