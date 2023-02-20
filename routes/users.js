const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require("../middlewares/auth");
const {
  UserModel,
  createToken,
  validateLogin,
  validateJoi,
} = require("../models/userModel");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ msg: "this is users endpoint" });
});

function generateRandomStars() {
  const numStars = Math.floor(Math.random() * (1 - 10 + 1)) + 1;
  return "*".repeat(numStars);
}

router.get("/userInfo", auth, async (req, res) => {
  try {
    let user = await UserModel.findOne(
      {
        _id: req.tokenData._id,
      },
      { password: 0 }
    );
    res.json(user);
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
    let user = new UserModel(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    user.password = generateRandomStars;
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.post("/login", async (req, res) => {
  let validBody = validateLogin(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ err: "Email you provided not found" });
    }
    let validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).json({ err: "Password you provided is wrong" });
    }
    let token = createToken(user._id);
    return res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

module.exports = router;
