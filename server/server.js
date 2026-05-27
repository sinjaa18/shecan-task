import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Form from "./models/Form.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
  
app.get("/", (req, res) => {
  res.send("API Running");
});

app.post("/submit", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        msg: "All fields required",
      });
    }

    await Form.create({
      name,
      email,
      message,
    });

    res.json({
      msg: "Form Submitted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      msg: "Server Error",
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
