import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
dotenv.config();
mongoose
  .connect(process.env.DBURI)
  .then(() => console.log("connected to db"))
  .catch((e) => console.log("error connecting to db", e));
const app = express();

app.listen(3000, () => console.log("server listening on port 3000!"));
