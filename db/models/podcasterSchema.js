import { Schema, model } from "mongoose";

const PodcasterSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  coverImage: {
    type: String,

    trim: true,
  },
  bio: {
    type: String,
    required: true,
    trim: true,
  },
  Subscribers: [{ type: Schema.Types.ObjectId, ref: "Subscription" }],
});

const Podcaster = model("Podcaster", PodcasterSchema);

export default Podcaster;
