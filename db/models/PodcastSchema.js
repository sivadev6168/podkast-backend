import { Schema, model } from "mongoose";

const PodcastSchema = Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  coverImage: {
    type: String,
    required: true,
    trim: true,
  },
  review: {
    type: String,
    trim: true,
  },
  podcaster: { type: Schema.Types.ObjectId, ref: "Podcaster" },
});

const Podcast = model("Podcast", PodcastSchema);

export default Podcast;
