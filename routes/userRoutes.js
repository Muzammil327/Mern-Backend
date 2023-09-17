import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config.js";

import {
  registerController,
  loginController,
  getAllController,
  logoutUser,
  updateUserController,
  savedAvatarController
} from "../Controller/userController.js";

const router = express.Router();

const VerifyToken = (req, res, next) => {
  const token = req.cookies.token;

console.log(token)
  try {
    if (!token) {
      return res.json({
        success: false,
        message: "NO Token Given",
      });
    } else {
      const user = jwt.verify(token, JWT_SECRET_KEY)
       console.log(user)
        req.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/user",VerifyToken, getAllController);
router.put("/user/update/:id",VerifyToken, updateUserController);
router.get("/logout", logoutUser);
router.post("/user/avatar",VerifyToken, savedAvatarController);

export default router;

