const mongoose = require("mongoose");
const Joi = require("joi");

let schema = new mongoose.Schema({
  title: String,
  summary: String,
  rating: Number,
  genere: String,
  user_id: String,
  date_created: String,
});

exports.MovieModel = mongoose.model("movies", schema);
