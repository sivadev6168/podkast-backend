import { Schema, model } from "mongoose";

const UserSchema = Schema({
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
  phone: {
    type: Number,
    required: true,
    trim: true,
    unique: true,
  },
});

const User = model("User", UserSchema);

export default User;
