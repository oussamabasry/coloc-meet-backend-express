const express = require("express");
const uploadMulter = require("../middlewares/multer");
const PostController = require("../controllers/PostController");
const checkAuth = require("../middlewares/check-auth");

const router = express.Router();

router.post("/", checkAuth, uploadMulter.any(), PostController.createPost);
router.post("/filter", PostController.getPostsFilter);
router.post("/search", PostController.searchpost);

router.get("/:postId", PostController.getOnePost);
router.get("/user/:userId", PostController.getUserPosts);
router.get("/", PostController.getAllPosts);
router.get("/related/:postId", PostController.getRelatedPosts);
router.delete("/:postId", PostController.deletePost);
router.put("/:postId", uploadMulter.any(), PostController.updatePost);

module.exports = router;
