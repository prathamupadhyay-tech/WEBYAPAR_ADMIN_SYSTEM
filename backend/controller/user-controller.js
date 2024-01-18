import user from "../models/user.js";
import bcryptjs from "bcryptjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "fs/promises";
import sharp from "sharp";
const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h", 
  });
  return token;
};

export const addUsers = async (req, res, next) => {
  const { userId, password } = req.body;
  let existingUser;
  try {
    existingUser = await user.findOne({ userId });
    if (existingUser) {
      
      return res.status(400).json({ message: "user already exits" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new user({ userId, password: hashedPassword });

    await newUser.save();

    return res.status(200).json({ message: "user saved" });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ message: "server error" });
  }
};

export const getUserInfo = async (req, res, next) => {
  const userIdFromToken = req.params.userId;

  try {
    const userInformation = await user
      .findOne({ _id: userIdFromToken })
      .select("-password");

    if (!userInformation) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    return res.status(200).json({ userInfo: userInformation, success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server issue", success: false });
  }
};

export const userLogin = async (req, res, next) => {
  const { userId, password } = req.body;
  let existingUser;
  if (userId === "0000") {
    return res.status(401).json({ message: "Invalid Id", success: false });
  }
  try {
    existingUser = await user.findOne({ userId });

    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    const match = await bcrypt.compare(password, existingUser.password);

    if (match) {
      delete existingUser.password;

      req.session.user = { userId: user.userId, role: user.role };
      req.session.save();
      const token = jwt.sign(
        {
          userId: existingUser._id,
          role: existingUser.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res
        .status(200)
        .json({ token, message: "Authenticated", success: true });
    } else {
      return res
        .status(401)
        .json({ message: "Invalid password", success: false });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server issue", success: false });
  }
};

export const getUsers = async (req, res, next) => {
  try {
    let users = await user.find({ role: { $ne: "admin" } }).select("-password");

    return res.status(200).json({ allUsers: users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
};

export const updateUser = async (req, res, next) => {
 
  const username = req.body.name;
  const userIdFromToken = req.params.userId;
  
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file uploaded", success: false });
    }
   

    const processedImageBuffer = await sharp(req.file.path)
      .resize(200)
      .toBuffer();

    const imagePath = `uploads/${userIdFromToken}_profileImage.jpg`;
    await sharp(processedImageBuffer).toFile(imagePath);

    await fs.unlink(req.file.path);

    const userInformation = await user.findOneAndUpdate(
      { _id: userIdFromToken },
      { name: username, profileImage: imagePath, approved: false }
    );

    if (!userInformation) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    return res.status(200).json({ userInfo: userInformation, success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server issue", success: false });
  }
};
