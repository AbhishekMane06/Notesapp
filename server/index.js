import express from "express";
import middleware from "./middleware/middleware.js";
import cors from "cors";
import dotenv from "dotenv";
import connectTOMongoDB from "./db/db.js";
import authRouter from "./routes/auth.js";
import noteRouter from "./routes/notes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);
app.get("/api/protected", middleware, (req, res) => {
  return res
    .status(200)
    .json({ success: true, message: "Protected route OK", user: req.user });
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectTOMongoDB();
    console.log("MongoDB connected.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to DB", err);
    process.exit(1);
  }
};

start();
