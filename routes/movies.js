const express = require("express");
const { MovieModel, validateJoi } = require("../models/movieModel");
const router = express.Router();
router.get("/", async (req, res) => {
  //pegenation variabels
  let perPage = 5;
  let page = req.query.page - 1 || 0;
  let sort = req.query.sort || "name";
  let desc = req.query.desc == "yes" ? 1 : -1;
  let querySearch = req.query.search;
  let searchExpression;

  if (querySearch) {
    searchExpression = new RegExp(querySearch, "i");
  }

  try {
    let data;
    // query example for search:
    // http://localhost:3003/movies?search=computer
    if (querySearch) {
      data = await MovieModel.find({
        $or: [
          { title: searchExpression },
          { summary: searchExpression },
          { genre: searchExpression },
        ],
      })
        .sort({ [sort]: desc })
        .skip(page * perPage)
        .limit(perPage);
    } else {
      // example for pegenation
      // http://localhost:3003/movies?search=a&sort=title&page=1&desc=1
      data = await MovieModel.find({})
        .limit(perPage)
        .skip(page * perPage)
        .sort({ [sort]: desc });
      if (data.length == 0) {
        return res.json({ msg: "No such page" });
      }
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.post("/", async (req, res) => {
  let validBody = validateJoi(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let movie = new MovieModel(req.body);
    movie.user_id = "test id"; //will be token here

    await movie.save();
    return res.json(movie);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.put("/:id", async (req, res) => {
  let validBody = validateJoi(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let id = req.params.id;
    let data = await MovieModel.updateOne(
      {
        _id: id,
        user_id: "test id", //TODO: TOKEN user_id:req.tokenData._id -> The user will only be able to edit records he added
      },
      req.body
    );
    // if succ wil display modfiedCount 1
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

module.exports = router;
