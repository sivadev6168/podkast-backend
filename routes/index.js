import express from "express";
import UserRoutes from "../routes/userRoutes/index.js";
import EpisodeRoutes from "../routes/episodeRoutes/index.js";
import PodcastRoutes from "../routes/podcastRoutes/index.js";
import FileUploadRoutes from "../routes/uploadRoutes/index.js";
import PodcasterRoutes from "../routes/podcasterRoutes/index.js";
import ReviewRoutes from "../routes/reviewRoutes/index.js";
import SubscribeRoutes from "../routes/subscribeRoutes/index.js";

const router = express.Router();

router.use("/user", UserRoutes);
router.use("/episode", EpisodeRoutes);
router.use("/file", FileUploadRoutes);
router.use("/podcast", PodcastRoutes);
router.use("/podcaster", PodcasterRoutes);
router.use("/review", ReviewRoutes);
router.use("/subscribe", SubscribeRoutes);

export default router;
