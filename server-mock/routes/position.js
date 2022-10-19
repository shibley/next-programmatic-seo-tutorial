const express = require("express");
const router = express.Router();
const position = require("../controller/position");

router.get("/", position.getAllPositions);

module.exports = router;
