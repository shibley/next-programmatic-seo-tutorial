const VideoCategory = require("../model/videoCategory");
const Video = require("../model/video");

module.exports.getAllVideoCategories = (req, res) => {
  const limit = Number(req.query.limit) || 0;
  const sort = req.query.sort == "desc" ? -1 : 1;
console.log(VideoCategory);
  VideoCategory.find()
    .select(["-_id"])
    .limit(limit)
    .sort({ id: sort })
    .then((videoCategories) => {
      console.log(videoCategories)
      res.json(videoCategories);
    })
    .catch((err) => console.log(err));
};

module.exports.getVideoCategory = (req, res) => {
  const id = req.params.id;

  VideoCategory.findOne({
    id,
  })
    .select(["-_id"])
    .then((videoCategory) => {
      res.json(videoCategory);
    })
    .catch((err) => console.log(err));
};

module.exports.getVideoCategories = (req, res) => {
  VideoCategory.distinct("category")
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => console.log(err));
};

module.exports.getVideosInCategory = (req, res) => {
  const categoryId = req.params.categoryId;
  const limit = Number(req.query.limit) || 0;
  const sort = req.query.sort == "desc" ? -1 : 1;

  Video.find({
    category_id: categoryId,
  })
    .select(["-_id"])
    .limit(limit)
    .sort({ id: sort })
    .then((videos) => {
      res.json(videos);
    })
    .catch((err) => console.log(err));
};

module.exports.addVideoCategory = async (req, res) => {
  if (typeof req.body == undefined) {
    res.json({
      status: "error",
      message: "data is undefined",
    });
  } else {
    const videoCategoryCount = await VideoCategory.find()
      .countDocuments(function (err, count) {
        return count || 0;
      });

    
    console.log(videoCategory, req.body)

    const videoCategory = new VideoCategory({
      id: req.body.id,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
      rating: req.body.rating,
    });

    videoCategory.save()
      .then(videoCategory => res.json(videoCategory))
      .catch(err => console.log(err))
    // res.json(product);

  }
};

module.exports.editVideoCategory = (req, res) => {
  if (typeof req.body == undefined || req.params.id == null) {
    res.json({
      status: "error",
      message: "something went wrong! check your sent data",
    });
  } else {
    res.json({
      id: req.params.id,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
    });
  }
};

module.exports.deleteVideoCategory = (req, res) => {
  if (req.params.id == null) {
    res.json({
      status: "error",
      message: "id should be provided",
    });
  } else {
    VideoCategory.findOne({
      id: req.params.id,
    })
      .select(["-_id"])
      .then((videoCategory) => {
        res.json(videoCategory);
      })
      .catch((err) => console.log(err));
  }
};
