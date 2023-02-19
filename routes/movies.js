const express = require("express");
const { MovieModel } = require("../models/movieModel");
const router = express.Router();
router.get("/", async (req, res) => {
  //pegenation variabels
  let perPage = 5;
  let page = req.query.page - 1 || 0;
  let sort = req.query.sort || "name";
  let desc = req.query.desc == "yes" ? 1 : -1;

  try {
    let data = await MovieModel.find({})
      .limit(perPage)
      .skip(page * perPage)
      .sort({ [sort]: desc });
    if (data.length == 0) {
      return res.json({ msg: "No such page" });
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});
module.exports = router;
