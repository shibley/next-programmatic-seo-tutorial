const express = require("express");
const router = express.Router();
const letter = require("../controller/letter");

router.get("/", letter.getAllLetters);

module.exports = router;
