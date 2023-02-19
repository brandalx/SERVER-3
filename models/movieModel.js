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

exports.validateJoi = (_reqBody) => {
  let joiSchema = Joi.object({
    title: Joi.string().min(2).max(150).required(),
    summary: Joi.string().min(2).max(150).required(),
    rating: Joi.number().min(1).max(9999).required(),
    genere: Joi.string().min(2).max(150).required(),
  });
  return joiSchema.validate(_reqBody);
};
