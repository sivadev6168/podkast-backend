import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js";
import mongoose from "./db/index.js";

const app = express();
dotenv.config({ path: "./.env" });
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.use(router);

app.use("*", (req, res) => {
  res.status(404).json({ message: "Router Not Found" });
});

app.listen(process.env.PORT_NUMBER, () => {
  console.log("Server Running @ 5000");
});
