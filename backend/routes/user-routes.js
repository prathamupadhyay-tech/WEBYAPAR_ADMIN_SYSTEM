import Express from "express";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
import {
  addUsers,
  getUsers,
  userLogin,
  getUserInfo,
  updateUser,
} from "../controller/user-controller.js";
const userRouter = Express.Router();

userRouter.post("/addUser", addUsers);
userRouter.post("/userLogin", userLogin);
userRouter.get("/getUsers", getUsers);
userRouter.get("/getUserInfo/:userId", getUserInfo);
userRouter.post(
  "/updateUser/:userId",
  upload.single("profileImage"),
  updateUser
);
export default userRouter;
