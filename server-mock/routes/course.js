const express = require("express");
const router = express.Router();
const course = require("../controller/course");

router.get("/", course.getAllCourses);
router.get("/states", course.getStates);
router.get("/state/:state", course.getCoursesInState);
router.get("/:id", course.getCourse);
router.get("/:slug", course.getCourseBySlug);
// router.post("/", product.addProduct);
router.put("/:id", course.editCourse);
// router.patch("/:id", product.editProduct);
// router.delete("/:id", product.deleteProduct);

module.exports = router;
