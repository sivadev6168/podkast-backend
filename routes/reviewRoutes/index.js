import express from "express";
import CheckToken from "../../middleWare/checkToken.js";
import Review from "../../db/models/reviewSchema.js";

const router = express.Router();

//-----GET ALL REVIEW-----
router.get("/", CheckToken(["USER", "PODCASTER"]), async (req, res) => {
  try {
    const review = await Review.find();
    return res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//-----GET REVIEW BY PODCASTID-----
router.get(
  "/podcast/:id",
  CheckToken(["USER", "PODCASTER"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const review = await Review.find({ podcastId: id }).populate("userId");
      return res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

//-----POST REVIEW-----
router.post("/", CheckToken(["USER"]), async (req, res) => {
  try {
    const body = { ...req.body };
    await Review.create(body);
    return res.status(200).json(body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
