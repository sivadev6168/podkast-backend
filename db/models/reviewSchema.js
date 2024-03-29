import { Schema, model } from "mongoose";

const ReviewSchema = Schema({
  podcastId: { type: Schema.Types.ObjectId, ref: "Podcast" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  review: {
    type: String,
    trim: true,
  },
});

const Review = model("Review", ReviewSchema);

export default Review;
