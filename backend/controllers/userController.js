import dotenv from "dotenv";
import { createUser } from "../services/authServices.js";
import UserModel from "../models/userModel.js";
dotenv.config();

export const signUp = async (req, res) => {
  const { email, firstname, lastname, password, role } = req.body;

  // Validate required fields
  if (!email || !firstname || !lastname || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  // Create user instance
  const user = new UserModel({ email, firstname, lastname, password, role });

  try {
    // Create user using auth service
    const response = await createUser(user);
    if (response.success) {
      return res.status(201).json(response);
    } else {
      return res.status(400).json(response);
    }
  } catch (error) {
    console.error("Error in user registration:", error);
    return res.status(500).json({
      success: false,
      message: "Registration failed. Please try again later.",
    });
  }
};
