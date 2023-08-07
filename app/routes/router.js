import express from "express";
const router = express.Router();
import musicController from "../controller/MusicController.js";
import BlogController from "../controller/BlogController.js";

router.get("/", function (req, res) {
  res.json({ success: true, message: "successfully", data: {} });
});

router.get("/music", musicController.musicTrack);
router.get("/get-now-playing", musicController.getNowPlaying);
router.get("/login", musicController.testingLogin);
router.get("/callback", musicController.callback);

router.get("/blogs", BlogController.articles);

export default router;
