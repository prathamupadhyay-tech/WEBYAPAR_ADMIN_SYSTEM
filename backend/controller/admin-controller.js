import user from "../models/user.js";
import fs from 'fs';
import path from 'path';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { URL } from "url";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const existingUser = await user.findOne({ userId });

    if (!existingUser) {
      return res.status(400).json({ message: "user not found " });
    }
    const updatedUser = await user.findOneAndUpdate(
      { userId },
      { $unset: { profileImage: 1, name: 1 } },
      { new: true }
    );
    const profileImagePath = path.resolve(__dirname, '../static', existingUser.profileImage);

    
    fs.unlinkSync(profileImagePath);
    return res
      .status(200)
      .json({ message: "User deleted successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server issue", success: false });
  }
};

export const deleteUserEntirely = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const existingUser = await user.findOne({ userId });

    if (!existingUser) {
      return res.status(400).json({ message: "user not found " });
    }
    const updatedUser = await user.findOneAndDelete({ userId });

    return res
      .status(200)
      .json({ message: "User deleted successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server issue", success: false });
  }
};

export const adminLogin = async (req, res, next) => {
  try {
    const { userId, password } = req.body;

    const adminUser = await user.findOne({ userId, role: "admin" });

    if (!adminUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, adminUser.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    
    req.session.user = { userId: adminUser.userId, role: adminUser.role };
    
    const token = jwt.sign(
      {
        userId: adminUser._id,
        role: adminUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    if (req.session.authenticated) {
      return res.status(200).json({ token, message: "User logged in" });
    } else {
      if (passwordMatch) {
        req.session.authenticated = true;
        req.session.user = {
          userId: adminUser.userId,
          role: adminUser.role,
        };
        return res.status(200).json({ session: req.session });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const approveUser = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const existingUser = await user.findOneAndUpdate(
      { userId },
      { approved: true }
    );
    return res.status(200).json({ message: "approved user" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal error" });
  }
};
