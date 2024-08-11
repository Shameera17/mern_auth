import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import ResponseBuilder from "../classes/ResponseBuilder .js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "user created successfully!" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));

    const isMatch = bcrypt.compare(await password, validUser.password);
    if (!isMatch) return next(errorHandler(401, "Invalid credentials"));

    const expiryTime = new Date(Date.now() + 3600000); // 1 hour from now

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: 3600000,
    });

    const { password: savedPassword, ...rest } = validUser._doc;
    const response = new ResponseBuilder();
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryTime })
      .status(200)
      .json(
        response.data({
          data: rest,
          message: "user logged in successfully!",
        })
      );
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const expiryTime = new Date(Date.now() + 3600000); // 1 hour from now

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 3600000,
      });
      const { password, ...rest } = user?._doc;
      const response = new ResponseBuilder();
      res
        .cookie("access_token", token, { httpOnly: true, expires: expiryTime })
        .status(200)
        .json(
          response.data({
            data: rest,
            message: "user logged in successfully!",
          })
        );
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          "_" +
          Math.floor(Math.random() * 10000).toString(),
        email: req.body.email,
        profilePicture: req.body.photo,
        password: hashedPassword,
      });

      await newUser.save();
      const { password: hashedPswd, ...rest } = validUser._doc;
      const expiryTime = new Date(Date.now() + 3600000); // 1 hour from now

      const response = new ResponseBuilder();
      res
        .cookie("access_token", token, { httpOnly: true, expires: expiryTime })
        .status(200)
        .json(
          response.data({
            data: rest,
            message: "user logged in successfully!",
          })
        );
    }
  } catch (error) {
    next(error);
  }
};
