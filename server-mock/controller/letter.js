const Letter = require("../model/letter");

module.exports.getAllLetters = (req, res) => {
  Letter.distinct("small")
    .then((letters) => {
      res.json(letters);
    })
    .catch((err) => console.log(err));
};