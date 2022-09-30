const Course = require("../model/course");

module.exports.getAllCourses = (req, res) => {
  const limit = 10000;//Number(req.query.limit) || 0;
  const sort = -1//req.query.sort == "desc" ? -1 : 1;
//console.log(req.query);
  Course.find({ "rating": { $ne: null } })
    .select(["-_id"])
    .limit(limit)
    .sort({ rating: sort })
    .then((Courses) => {
      res.json(Courses);
    })
    .catch((err) => console.log(err));
};

module.exports.getCourse = (req, res) => {
  const id = req.params.id;

  Course.findOne({
    id,
  })
    .select(["-_id"])
    .then((course) => {
      res.json(course);
    })
    .catch((err) => console.log(err));
};

module.exports.getCourseBySlug = (req, res) => {
  const slug = req.params.slug;

  Course.findOne({
    slug,
  })
    .select(["-_id"])
    .then((course) => {
      res.json(course);
    })
    .catch((err) => console.log(err));
};

module.exports.getStates = (req, res) => {
  Course.distinct("state")
    .then((states) => {
      res.json(states);
    })
    .catch((err) => console.log(err));
};

module.exports.getCoursesInState = (req, res) => {
  const state = req.params.state;
  const limit = Number(req.query.limit) || 1000;
  const sort = -1;//req.query.sort == "desc" ? -1 : 1;
  //console.log(req.query.limit);
  Course.find({
    state, "rating": { $ne: null }
  })
    .select(["-_id"])
    .limit(limit)
    .sort({ rating: sort })
    .then((Courses) => {
      //console.log(res.json(Courses));
      res.json(Courses);
    })
    .catch((err) => console.log(err));
};

module.exports.editCourse = (req, res) => {
  if (typeof req.body == undefined || req.params.id == null) {
    res.json({
      status: "error",
      message: "something went wrong! check your sent data",
    });
  } else {
    const id = req.params.id;
    Course.findOne({
      id,
    })
      .select(["-_id"])
      .then((course) => {
        const query = { id: id };
        Course.findOneAndUpdate(query, { photoreference: req.body.photoreference, image: req.body.image })
          .then(result => console.log(result))
          .catch(err => console.log(err));

          res.json(course);
      })
      .catch((err) => console.log(err));
    
    }
};

// module.exports.addProduct = async (req, res) => {
//   if (typeof req.body == undefined) {
//     res.json({
//       status: "error",
//       message: "data is undefined",
//     });
//   } else {
//     const productCount = await Product.find()
//       .countDocuments(function (err, count) {
//         return count || 0;
//       });

    
//     console.log(productCount, req.body)

//     const product = new Product({
//       id: req.body.id,
//       title: req.body.title,
//       price: req.body.price,
//       description: req.body.description,
//       image: req.body.image,
//       category: req.body.category,
//       rating: req.body.rating,
//     });

//     product.save()
//       .then(product => res.json(product))
//       .catch(err => console.log(err))
//     // res.json(product);

//   }
// };

// module.exports.deleteProduct = (req, res) => {
//   if (req.params.id == null) {
//     res.json({
//       status: "error",
//       message: "cart id should be provided",
//     });
//   } else {
//     Product.findOne({
//       id: req.params.id,
//     })
//       .select(["-_id"])
//       .then((product) => {
//         res.json(product);
//       })
//       .catch((err) => console.log(err));
//   }
// };
