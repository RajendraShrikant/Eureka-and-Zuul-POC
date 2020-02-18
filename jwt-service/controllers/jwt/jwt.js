const express = require("express");
const router = express.Router();
const utils = require("../../utils/utils");
const jwt = require('jsonwebtoken');
const config = require("../../configurations/config");

router.post("/generateToken", (req, res) => {
    let todaysDate = new Date();
    console.log(`${req.headers.host} Hit POST /login API at time-stamp : ${todaysDate.toLocaleDateString()} | ${todaysDate.toLocaleTimeString()}`);
    if (!req.body.email || req.body.email == "") {
        res.status(422).send({ status: false, result: { error: `Missing required params!`, message: `email or password missing in request body.` } });
        return;
    }
    try {
        let token = utils.generateJWT(req.body.email);
        res.status(200).send({ status: true, result: { data: { token: token }, message: `Token generated!` } });

    } catch (e) {
        console.error(`Error catched in /login POST API : ${e}`);
        res.status(500).send({ status: false, result: { error: e } });
    }
});

router.get("/verifyToken", (req, res, next) => {
    let todaysDate = new Date();
    console.log(`${req.headers.host} Hit GET /login API at time-stamp : ${todaysDate.toLocaleDateString()} | ${todaysDate.toLocaleTimeString()}`);
    let token = req.headers['x-access-token'] || req.headers['authorization'] || req.headers['context'];
    // console.log(`Token in verifyJWT : `, token);
    if (token) {
        jwt.verify(token, config.APPP_CONFIG.SECURITY.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    success: false,
                    result: {
                        message: 'Token is not valid',
                        error: err
                    }
                });
            } else {
                res.status(200).send({status: true, result: {email: decoded.userEmail}});
            }
        });
    }
    else {
        res.status(422).send({
            success: false,
            result: {
                message: 'Auth token is not supplied'
            }
        });
    }});

module.exports = router;