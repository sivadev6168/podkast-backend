import express from "express";
import bcrypt from "bcrypt";
import CheckToken from "../../middleWare/checkToken.js";
import Podcaster from "../../db/models/podcasterSchema.js";
import jwt from "jsonwebtoken";
import Podcast from "../../db/models/PodcastSchema.js";

const router = express.Router();

//-----GET ALL PODCASTERS-----
router.get("/", CheckToken(["USER", "PODCASTER"]), async (req, res) => {
  try {
    const podcaster = await Podcaster.find();
    return res.status(200).json(podcaster);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//-----GET PODCASTER BY ID-----
router.get("/:id", CheckToken(["USER", "PODCASTER"]), async (req, res) => {
  try {
    const { id } = req.params;
    const podcaster = await Podcaster.findById(id);
    return res.status(200).json(podcaster);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get a podcaster by ID and populate its podcasts
router.get(
  "/podcastall/:id",
  CheckToken(["USER", "PODCASTER"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const podcaster = await Podcaster.findById(id).populate("podcasts");
      return res.status(200).json(podcaster);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

//-----UPDATE PODCASTER-----
router.patch("/edit/:id", CheckToken(["PODCASTER"]), async (req, res) => {
  try {
    const { id } = req.params;
    const podcaster = await Podcaster.findByIdAndUpdate(id);
    return res.status(200).json(podcaster);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//-----DELETE PODCASTER-----
router.delete("/delete/:id", CheckToken(["PODCASTER"]), async (req, res) => {
  try {
    const { id } = req.params;
    const podcaster = await Podcaster.findByIdAndDelete(id);
    return res.status(200).json({ message: "Podcaster Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//-----SIGNUP PODCASTER-----
router.post("/signup", async (req, res) => {
  try {
    const body = { ...req.body };
    const IsPodcasterMail = await Podcaster.findOne({ email: body.email });
    if (IsPodcasterMail) {
      return res.status(409).json({ message: "Email already taken" });
    }

    //Hashing password
    const HashedPassword = await bcrypt.hash(body.password, 2);
    body.password = HashedPassword;
    await Podcaster.create(body);
    return res.status(200).json({ message: "Signup Successfull" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//---PODCASTER LOGIN-----
router.post("/login", async (req, res) => {
  try {
    const body = { ...req.body };
    const podcaster = await Podcaster.findOne({ email: body.email });
    //Email validation
    if (!podcaster) {
      return res.status(401).json({ message: "Incorrect Email Or Password" });
    }
    //Password validation
    const isMatching = await bcrypt.compare(body.password, podcaster.password);
    if (!isMatching) {
      return res.status(401).json({
        message: "Incorrect Email Or Password",
      });
    }

    //Adding token
    const token = jwt.sign(
      { id: podcaster._id, role: "PODCASTER" },
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
