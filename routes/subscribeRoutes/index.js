import express from "express";
import CheckToken from "../../middleWare/checkToken.js";
import Subscribe from "../../db/models/subscribeSchema.js";

const router = express.Router();

router.get("/", CheckToken(["USER", "PODCASTER"]), async (req, res) => {
  try {
    const subscribe = await Subscribe.find();
    return res.status(200).json(subscribe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", CheckToken(["USER", "PODCASTER"]), async (req, res) => {
  try {
    const { podcasterId, userId, subscribeStatus } = req.body;
    console.log(req.body, "aa");
    let subscription = await Subscribe.findOneAndUpdate(
      { podcasterId, userId },
      { subscribeStatus },
      { new: true, upsert: true }
    );

    return res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -----GET ALL SUBSCRIBERS OF PODCASTER-----
router.get(
  "/all/:podcasterId", // Change parameter name to podcasterId
  CheckToken(["PODCASTER"]),
  async (req, res) => {
    try {
      const { podcasterId } = req.params;
      const subscribers = await Subscribe.find({ podcasterId }).populate(
        "podcasterId"
      );
      console.log("working");
      return res.status(200).json(subscribers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

//GET SUBSCRIPTION BY USER-----

router.get(
  "/:userId/:podcasterId",
  CheckToken(["USER", "PODCASTER"]),
  async (req, res) => {
    try {
      const { userId, podcasterId } = req.params;
      const subscription = await Subscribe.findOne({ userId, podcasterId });
      return res.status(200).json(subscription);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
