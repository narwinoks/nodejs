import express from "express";
const router = express.Router();
import musicController from "../controller/MusicController.js";
import BlogController from "../controller/BlogController.js";
import GithubController from "../controller/GithubController.js";
router.get("/", function (req, res) {
  res.json({ success: true, message: "successfully", data: {} });
});

// music routes
router.get("/music", musicController.musicTrack);
router.get("/get-now-playing", musicController.getNowPlaying);
router.get("/login", musicController.testingLogin);
router.get("/callback", musicController.callback);

// blog routes
router.get("/blogs", BlogController.articles);
// github routes
router.get("/github/info", GithubController.getStatGithub);
// project route


export default router;
