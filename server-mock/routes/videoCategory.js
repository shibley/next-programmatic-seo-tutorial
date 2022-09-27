const express = require("express");
const router = express.Router();
const videoCategory = require("../controller/videoCategory");

router.get("/", videoCategory.getAllVideoCategories);
//router.get("/:id", videoCategory.getVideoCategory);
router.get("/:categoryId", videoCategory.getVideosInCategory);
router.post("/", videoCategory.addVideoCategory);
router.put("/:id", videoCategory.editVideoCategory);
router.patch("/:id", videoCategory.editVideoCategory);
router.delete("/:id", videoCategory.deleteVideoCategory);

module.exports = router;
