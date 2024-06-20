import express from "express";
import { signup } from "../controllers/auth.controller.js";

const router = express.Router();
router.post("/signin", (req, res) => {
  res.json({
    message: "its working",
  });
});
router.post("/signup", signup);
export default router;
