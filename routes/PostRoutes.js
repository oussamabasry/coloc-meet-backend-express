const express = require("express");
const uploadMulter = require("../middlewares/multer");
const PostController = require("../controllers/PostController");

const router = express.Router();

router.post("/", uploadMulter.any(), PostController.createPost);
router.get("/:postId", PostController.getOnePost);
router.get("/", PostController.getAllPosts);
router.get("/related/:postId", PostController.getRelatedPosts);

module.exports = router;
