import { config } from "dotenv";
import { pool } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

config();

const JWT_SECRET = process.env.JWT_SECRET;

export const createUser = async (user) => {
  try {
    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [user.email]
    );
    if (existingUser.length > 0) {
      return { success: false, message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const query = `INSERT INTO users (email, firstname, lastname, password, role ) VALUES (?, ?, ?, ?, ?)`;
    const values = [
      user.email,
      user.firstname,
      user.lastname,
      hashedPassword,
      user.role || "user",
    ];
    await pool.query(query, values);
    return { success: true, message: "User created successfully" };
  } catch (error) {
    console.error("Create user error:", error);
    return {
      success: false,
      message: "User creation failed. Please try again later.",
    };
  }
};

// Login User with JWT token
export const loginUser = async (email, password) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      return { success: false, message: "User not found" };
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return { success: false, message: "Incorrect password" };
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Generated token:", token); // For debugging

    return {
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Login failed. Please try again later." };
  }
};
