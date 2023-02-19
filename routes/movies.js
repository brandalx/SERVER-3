const express = require("express");
const { MovieModel } = require("../models/movieModel");
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    let data = await MovieModel.find({});
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});
module.exports = router;
