const Position = require("../model/position");

module.exports.getAllPositions = (req, res) => {
  Position.distinct("text")
    .then((positions) => {
      res.json(positions);
    })
    .catch((err) => console.log(err));
};