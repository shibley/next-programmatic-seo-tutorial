const express = require("express");
const router = express.Router();
const city = require("../controller/city");

router.get("/", city.getAllCities);
// router.get("/categories", city.getcityCategories);
// router.get("/category/:category", city.getcitysInCategory);
//router.get("/:id", city.getcity);
// router.get("/:slug", city.getcityBySlug);
// router.post("/", city.addcity);
// router.put("/:id", city.editcity);
// router.patch("/:id", city.editcity);
// router.delete("/:id", city.deletecity);

module.exports = router;