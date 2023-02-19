const express = require("express");
const { UserModel } = require("../models/userModel");
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    let data = await UserModel.find({});
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});
module.exports = router;
