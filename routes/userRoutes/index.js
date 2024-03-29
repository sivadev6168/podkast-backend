import express from "express";
import User from "../../db/models/UserSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import CheckToken from "../../middleWare/checkToken.js";

const router = express.Router();

//-----GET ALL USERS-----
router.get("/", CheckToken(["USER", "PODCASTER"]), async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//-----GET ALL USERS By Id-----
router.get("/:id", CheckToken(["USER", "PODCASTER"]), async (req, res) => {
  try {
    const { id } = req.params;
    const users = await User.findById(id);
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//-----SIGNUP USER-----
router.post("/signup", async (req, res) => {
  try {
    const body = { ...req.body };
    const IsUserMail = await User.findOne({ email: body.email });
    if (IsUserMail) {
      return res.status(409).json({ message: "Email already taken" });
    }

    //Hashing password
    const HashedPassword = await bcrypt.hash(body.password, 2);
    body.password = HashedPassword;

    await User.create(body);
    return res.status(200).json({ message: "Signup Successfull" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//---USER LOGIN-----
router.post("/login", async (req, res) => {
  try {
    const body = { ...req.body };
    const user = await User.findOne({ email: body.email });
    //Email validation
    if (!user) {
      return res.status(401).json({ message: "Incorrect Email Or Password" });
    }
    //Password validation
    const isMatching = await bcrypt.compare(body.password, user.password);
    if (!isMatching) {
      return res.status(401).json({ message: "Incorrect Email Or Password" });
    }

    //Adding token
    const token = jwt.sign(
      { id: user._id, role: "USER" },
      process.env.SECRET_KEY,
      { expiresIn: "28d" }
    );
    //Sending token with response
    return res.status(200).json({ message: "Login Sucessfull", token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;
