import Express from "express";

import {
  adminLogin,
  approveUser,
  deleteUser,
  deleteUserEntirely,
} from "../controller/admin-controller.js";
const adminRouter = Express.Router();

adminRouter.get("/deleteUser/:userId", deleteUser);
adminRouter.post("/adminLogin", adminLogin);
adminRouter.get("/approveUser/:userId", approveUser);
adminRouter.get("/deleteUserEntirely/:userId", deleteUserEntirely);
export default adminRouter;
