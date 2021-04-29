const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

router.post("/signup", UserController.signup);
router.get("/", UserController.getAllUsers);
router.get("/:userId", UserController.getOneUser);
router.delete("/:userId", UserController.deleteUser);

module.exports = router;
