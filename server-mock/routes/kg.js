const express = require("express");
const router = express.Router();
const kg = require("../controller/kg");

router.get("/", kg.getAllKgs);

module.exports = router;
