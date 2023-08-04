import express from "express";
const router = express.Router();

router.get("/", function (req, res) {
  res.json({ success: true, message: "successfully", data: {} });
});

export default router;
