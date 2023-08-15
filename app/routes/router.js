import express from "express";
const router = express.Router();
import musicController from "../controller/MusicController.js";
import BlogController from "../controller/BlogController.js";
import GithubController from "../controller/GithubController.js";
import ProjectController from "../controller/ProjectController.js";
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
router.get("/projects", ProjectController.index);
router.post("/projects", ProjectController.create);
router.put("/projects/:id", ProjectController.update);
router.delete("/projects/:id", ProjectController.destroy);

export default router;
