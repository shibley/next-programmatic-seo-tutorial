const express = require("express");
const router = express.Router();
const word = require("../controller/word");

router.get("/", word.getAllWords);
// router.get("/states", course.getStates);
// router.get("/state/:state", course.getCoursesInState);
// router.post("/", product.addProduct);
// router.put("/:id", course.editCourse);
// router.patch("/:id", product.editProduct);
// router.delete("/:id", product.deleteProduct);

module.exports = router;