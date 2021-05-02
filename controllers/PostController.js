const Post = require("../models/PostModel");
const User = require("../models/UserModel");
const mongoose = require("mongoose");

const getOnePost = async (req, res, next) => {
  const id = req.params.postId;
  try {
    const post = await Post.findById(id).populate(
      "user",
      "firstName lastName birth email phone"
    );
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}).populate(
      "user",
      "firstName lastName birth email phone"
    );
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: err });
  }
};

const getRelatedPosts = async (req, res, next) => {
  const id = req.params.postId;
  try {
    const post = await Post.findById(id);
    const relatedPosts = await Post.find({
      _id: { $ne: post._id },
      city: post.city,
    }).limit(4);
    res.status(200).json(relatedPosts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const createPost = async (req, res, next) => {
  try {
    await User.findById(req.body.userId);
  } catch (err) {
    return res.status(500).json({ message: "User not found ", error: err });
  }
  const images = [];
  req.files.map((image) => {
    images.push(image.path);
  });
  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    city: req.body.city,
    date: req.body.date,
    stars: req.body.stars,
    price: req.body.price,
    description: req.body.description,
    gender: req.body.gender,
    roommatesNumber: req.body.roommatesNumber,
    roommatesMinAge: req.body.roommatesMinAge,
    roommatesMaxAge: req.body.roommatesMaxAge,
    status: req.body.status,
    postImages: images,
    user: req.body.userId,
  });
  try {
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = { getOnePost, getAllPosts, getRelatedPosts, createPost };
