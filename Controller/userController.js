import asyncHandler from "express-async-handler";
import Userauthentication from "../model/userModel.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config.js";
import Cookies from "js-cookie";
import nodemailer from "nodemailer";
import cloudinary from "../utils/cloudinary.js";

export const registerController = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  //   validation
  if (!username) {
    return res.json({
      status: 400,
      success: false,
      error: "Username is required.",
    });
  }
  if (!email) {
    return res.json({
      status: 400,
      success: false,
      error: "Email is Required.",
    });
  }
  if (!password) {
    return res.json({
      status: 400,
      success: false,
      error: "Password is Required.",
    });
  }

  //   existing email
  const existingEmail = await Userauthentication.findOne({ email });
  if (existingEmail) {
    return res.json({
      status: 400,
      success: false,
      error: "Already Register please login",
    });
  }

  // ------------ password hash ------------
  const hashedPassword = await hashPassword(password);

  try {
    const newUser = new Userauthentication({
      username,
      email,
      password: hashedPassword,
    });
    // send user data
    const user = await newUser.save();

    return res.json({
      status: 200,
      success: true,
      message: "Email Successfully Created.",
      user,
    });
  } catch (error) {
    return res.json({
      status: 401,
      success: false,
      error: "Email not creating.",
      error,
    });
  }
});
// update
export const updateUserController = async (req, res) => {
  try {
    const { username, email } = req.body;
    const { id } = req.params;
    const category = await Userauthentication.findByIdAndUpdate(
      id,
      { username, email },
      { new: true }
    );

    res.status(200).send({
      success: true,
      messsage: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

export const getAllController = async (req, res) => {
  const id = req.user.id;

  try {
    const user = await Userauthentication.findById(id);

    console.log(user);
    if (!user) {
      return res.status(404).json({ messsage: "User Not FOund" });
    } else {
      return res.status(200).json({
        messsage: "User FOund",
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const loginController = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  //   validation
  if (!email) {
    return res.json({
      status: 400,
      success: false,
      error: "Email is Required.",
    });
  }
  if (!password) {
    return res.json({
      status: 400,
      success: false,
      error: "Password is Required.",
    });
  }
  //   existing email
  const user = await Userauthentication.findOne({ email });
  if (!user) {
    return res.json({
      status: 400,
      success: false,
      error: "Email is not registerd plz Login",
    });
  }

  // check password
  const match = await comparePassword(password, user.password);
  if (!match) {
    return res.json({
      success: false,
      error: "Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    JWT_SECRET_KEY,
    { expiresIn: "10h" }
  );
  const options = {
    path: '/',
  secure: true, // Requires HTTPS
  expires: new Date(Date.now() + 86400000), // Expires in 24 hourspath: "/",
   
  };
  res.cookie("token", token, options);
  try {
    return res.json({
      success: true,
      message: "User Login Successfully",
      user: {
        id: user._id,
        usename: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return res.json({
      success: false,
      error: "Error Login User",
      error,
    });
  }
});

export const logoutUser = (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};

export const savedAvatarController = async (req, res) => {
  const { avatar } = req.body;
  
  const result = await cloudinary.uploader.upload(
    avatar, {
    folder: "avatars",
  });
  console.log(result)

 try {
   // Update the user's avatar information in the database
  //  await Userauthentication.findByIdAndUpdate(
  //   req.user._id,
  //   {
  //     avatar: {
  //       public_id: result.public_id,
  //       url: result.secure_url,
  //     },
  //   },
  //   { new: true }
  // );

 } catch (error) {
  console.log(error)
 }
};
