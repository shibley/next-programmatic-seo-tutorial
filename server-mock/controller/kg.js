const Kgs = require("../model/kg");

module.exports.getAllKgs = (req, res) => {
  Kgs.find()
    .select(["-_id"])
    .then((kgs) => {
      res.json(kgs);
    })
    .catch((err) => console.log(err));
};