const Course = require("../model/word");

module.exports.getAllWords = (req, res) => {
  const limit = 10000;//Number(req.query.limit) || 0;
  const sort = -1//req.query.sort == "desc" ? -1 : 1;
  const search = req.query.letter;
  const position = req.query.position;
  const regex = '^.{' + position + '}';
  
    //console.log(req.query);
  Course.find({"word": new RegExp(regex + search, 'i')})
    .select(["-_id"])
    .limit(limit)
    .sort({ word: sort })
    .then((Words) => {
    res.json(Words);
    })
    .catch((err) => console.log(err));

};