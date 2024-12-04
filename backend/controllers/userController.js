import { createUser, loginUser } from "../services/authServices.js";
import UserModel from "../models/userModel.js";

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

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  try {
    // Call loginUser function from auth service
    const response = await loginUser(email, password);

    if (response.success) {
      return res.status(200).json(response); // Login successful
    } else {
      return res.status(401).json(response); // Unauthorized
    }
  } catch (error) {
    console.error("Error in user login:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again later.",
    });
  }
};
