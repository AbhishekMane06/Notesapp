import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const middleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkeyofnoteapp");

    if (!decoded) {
      return res.status(401).json({ success: false, message: "Wrong Token" });
    }
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "No User" });
    }
    const newUser = { name: user.name, id: user._id };
    req.user = newUser;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Please login" });
  }
};

export default middleware;
