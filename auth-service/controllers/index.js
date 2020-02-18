const express = require("express");
const router = express.Router();

router.use("/api", require("./authorization/authorize"));

module.exports = router;