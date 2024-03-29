import { Schema, model } from "mongoose";

const SubscribeSchema = Schema({
  podcasterId: { type: Schema.Types.ObjectId, ref: "Podcaster" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  subscribeStatus: {
    type: Boolean,
    default: false,
  },
});

const Subscribe = model("Subscribe", SubscribeSchema);

export default Subscribe;
