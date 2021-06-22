const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const UserController = require("../controllers/UserController");

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get("/", checkAuth, UserController.getAllUsers);
router.get("/:userId", checkAuth, UserController.getOneUser);
router.delete("/:userId", checkAuth, UserController.deleteUser);

module.exports = router;
