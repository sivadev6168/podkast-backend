import express from "express";
import Episode from "../../db/models/EpisodeSchema.js";
import Podcast from "../../db/models/PodcastSchema.js";
import CheckToken from "../../middleWare/checkToken.js";

const router = express.Router();

//-----GET ALL EPISODES-----
router.get("/", CheckToken(["USER", "PODCASTER"]), async (req, res) => {
  try {
    const episode = await Episode.find();
    return res.status(200).json(episode);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//-----GET EPISODE BY ID-----
router.get(
  "/:podcastId",
  CheckToken(["USER", "PODCASTER"]),
  async (req, res) => {
    try {
      const { podcastId } = req.params;
      console.log(req.params, "working");
      const episode = await Episode.find({ podcastId: podcastId }).populate(
        "podcastId"
      );
      return res.status(200).json(episode);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

//-----POST EPISODES-----

router.post("/", CheckToken(["PODCASTER"]), async (req, res) => {
  try {
    const body = { ...req.body };
    await Episode.create(body);
    return res.status(200).json(body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//-----UPDATE EPISODE-----
router.patch("/edit/:id", CheckToken(["PODCASTER"]), async (req, res) => {
  try {
    const { id } = req.params.id;
    const episode = await Episode.findByIdAndUpdate(id, req.body);
    return res.status(200).json({ message: "Episode Updated", episode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//-----DELETE EPISODE-----
router.delete("/delete/:id", CheckToken(["PODCASTER"]), async (req, res) => {
  try {
    const { id } = req.params.id;
    await Episode.findByIdAndDelete(id);
    return res.status(200).json({ message: "Episode Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
