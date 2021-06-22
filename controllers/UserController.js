const User = require("../models/UserModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  console.log(req.body);
  try {
    const searchUser = await User.find({ email: req.body.email });
    if (searchUser.length >= 1) {
      return res.status(409).json({
        message: "this email exist",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }

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

const login = async (req, res, next) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user.length < 1) {
      return res.status(401).json({
        message: "Auth failed",
      });
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            email: user[0].email,
            userId: user[0]._id,
          },
          process.env.TOKEN_SECRET /* ,
          {
            expiresIn: "1h",
          } */
        );
        user[0].password = undefined;
        return res.status(200).json({
          message: "Auth successful",
          token: token,
          user: user[0],
        });
      }
      res.status(401).json({
        message: "Auth failed",
      });
    });
  } catch (error) {
    res.status(500).json({ error: err });
  }
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

const updateUser = async (req, res, next) => {
  const id = req.params.userId;
  console.log(req.body);
  mongoose.set("useFindAndModify", false);
  User.findByIdAndUpdate(
    id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birth: req.body.birth,
      email: req.body.email,
      phone: req.body.phone,
    },
    function (err, user) {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({
          message: "User updated successfully",
          user: user,
        });
      }
    }
  );
};

module.exports = {
  getOneUser,
  getAllUsers,
  deleteUser,
  signup,
  login,
  updateUser,
};
