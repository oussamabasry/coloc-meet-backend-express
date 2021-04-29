const User = require("../models/UserModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const getOneUser = async (req, res, next) => {
  const id = req.params.userId;
  try {
    const user = await User.findById(id).select(
      "firstName lastName birth email phone"
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select(
      "firstName lastName birth email phone"
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: err });
  }
};

const signup = async (req, res, next) => {
  // search if user exist or not
  try {
    const searchUser = await User.find({ email: req.body.email });
    if (searchUser.length >= 1) {
      return res.status(409).json({
        message: "this email exist",
      });
    }
  } catch (error) {
    res.status(500).json({ error: err });
  }
  // if hash password is passed successfully, we create a user and we save it in data base
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birth: req.body.birth,
        email: req.body.email,
        phone: req.body.phone,
        password: hash,
      });
      try {
        await user.save();
        res.status(201).json({ message: "created user" });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  });
};

const deleteUser = async (req, res, next) => {
  const id = req.params.userId;
  try {
    await User.remove({ _id: id });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = { getOneUser, getAllUsers, deleteUser, signup };
