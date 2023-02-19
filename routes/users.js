const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

router.get("/userInfo", async (req, res) => {
  try {
    res.json({ msg: "this is users info" });
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.post("/", async (req, res) => {
  try {
    res.json({ msg: "this is users info" });
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.post("/login", async (req, res) => {
  try {
    res.json({ msg: "this is users info" });
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

module.exports = router;
