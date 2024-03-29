import { Schema, model } from "mongoose";

const EpisodeSchema = Schema(
  {
    episodeTitle: {
      type: String,
      required: true,
      trim: true,
    },
    audio: {
      type: String,
      required: true,
      trim: true,
    },

    podcastId: { type: Schema.Types.ObjectId, ref: "Podcast" },
  },

  {
    timestamps: true,
  }
);

const Episode = model("Episode", EpisodeSchema);

export default Episode;
