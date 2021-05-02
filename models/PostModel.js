const mongoose = require("mongoose");
const User = require("./UserModel");

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  city: { type: String, required: true },
  date: { type: Date, required: true },
  stars: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  gender: { type: String, required: true },
  roommatesNumber: { type: Number, required: true },
  roommatesMinAge: { type: Number, required: true },
  roommatesMaxAge: { type: Number, required: true },
  status: { type: String, required: true },
  postImages: { type: [], required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Post", postSchema);
