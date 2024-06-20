import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();
mongoose
  .connect(process.env.DBURI)
  .then(() => console.log("connected to db"))
  .catch((e) => console.log("error connecting to db", e));
const app = express();
app.use(express.json());
app.listen(3000, () => console.log("server listening on port 3000!"));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
