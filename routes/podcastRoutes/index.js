import express from "express";
import Podcast from "../../db/models/PodcastSchema.js";
import Episode from "../../db/models/EpisodeSchema.js";
import CheckToken from "../../middleWare/checkToken.js";
import Podcaster from "../../db/models/podcasterSchema.js";

const router = express.Router();

//-----GET ALL PODCASTS-----
router.get("/", CheckToken(["USER", "PODCASTER"]), async (req, res) => {
  try {
    const podcasts = await Podcast.find();
    return res.status(200).json(podcasts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -----GET LAST 8 UPLOADED EPISODES-----
router.get("/latest", CheckToken(["USER", "PODCASTER"]), async (req, res) => {
  try {
    const podcasts = await Podcast.find()
      .populate("podcaster")
      .sort({ createdAt: -1 }) // Sort episodes by creation date in descending order
      .limit(8); // Limit the results to 8 episodes
    return res.status(200).json(podcasts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//-----GET PODCASTS BY ID-----
router.get("/:id", CheckToken(["USER", "PODCASTER"]), async (req, res) => {
  try {
    const { id } = req.params.id;
    const podcast = await Podcast.findById(id);
    ate;
    return res.status(200).json(podcast);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//-----GET PODCASTS BY PODCASTER-----
router.get(
  "/podcaster/:id",
  CheckToken(["USER", "PODCASTER"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const podcasts = await Podcast.find({ podcaster: id });

      return res.status(200).json(podcasts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// GET single podcast with episodes-----
router.get(
  "/podcastsingle/:id",
  CheckToken(["USER", "PODCASTER"]),
  async (req, res) => {
    try {
      const { id } = req.params;

      // Find the podcast by ID and populate its episodes
      const podcast = await Podcast.findById(id).populate("episode");

      if (!podcast) {
        return res.status(404).json({ message: "Podcast not found" });
      }

      return res.status(200).json(podcast);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

//-----PODCAST SEARCH WITH DESCRIPTION TAGS-----
router.get(
  "/podcastsearch/:id",
  CheckToken(["USER", "PODCASTER"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const podcasts = await Podcast.find({
        description: { $regex: id, $options: "i" },
      });
      if (podcasts.length === 0) {
        return res.status(200).json({ message: "No Podcast Found!!!" });
      }
      return res.status(200).json(podcasts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

//-----POST PODCASTS-----
router.post("/", CheckToken(["PODCASTER"]), async (req, res) => {
  try {
    const body = { ...req.body };
    await Podcast.create(body);
    return res.status(200).json(body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//-----EDIT PODCAST-----
router.patch("/edit/:id", CheckToken(["PODCASTER"]), async (req, res) => {
  try {
    const { id } = req.params.id;
    const podcast = await Podcast.findByIdAndUpdate(id, req.body);
    return res.status(200).json({ message: "Podcast Updated", podcast });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//-----DELETE PODCAST-----
router.delete("/delete/:id", CheckToken(["PODCASTER"]), async (req, res) => {
  try {
    const { id } = req.params;
    await Podcast.findByIdAndDelete(id);
    return res.status(200).json({ message: "Podcast Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
