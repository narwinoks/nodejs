import express from "express";
const router = express.Router();
import musicController from "../controller/MusicController.js";

router.get("/", function (req, res) {
  res.json({ success: true, message: "successfully", data: {} });
});

router.get("/music", musicController.musicTrack);
router.get("/login", musicController.testingLogin);
router.get("/callback", musicController.callback);

export default router;
