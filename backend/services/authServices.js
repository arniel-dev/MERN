import { config } from "dotenv";
import { pool } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { transporter } from "../utils/utils.js";

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
    const query = `INSERT INTO users (email, fullname, password, role ) VALUES (?, ?, ?, ?)`;
    const values = [
      user.email,
      user.fullname,
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
      return {
        success: false,
        message: "Login failed; Invalid email address or password",
      };
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return {
        success: false,
        message: "Invalid email address or password",
      };
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
        fullname: user.fullname,
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Login failed. Please try again later." };
  }
};
export const handleForgotPassword = async (email) => {
  try {
    pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err, result) => {
        if (err) {
          return {
            success: false,
            message: "Database error",
            status: 500,
          };
        }

        if (result.length === 0) {
          // return res.status(404).json({ message: "Email not found" });
          return {
            success: false,
            message: "Email not found",
            status: 404,
          };
        }

        // Generate reset token and expiry time (1 hour from now)
        const token = crypto.randomBytes(20).toString("hex");
        const expiryTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
        const formattedExpiryTime = expiryTime
          .toISOString()
          .slice(0, 19)
          .replace("T", " "); // Format as 'YYYY-MM-DD HH:mm:ss'

        pool.query(
          "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?",
          [token, formattedExpiryTime, email],
          (err, result) => {
            if (err) {
              // return res.status(500).json({ error: "Failed to update token" });
              return {
                success: false,
                message: "Failed to update token",
                status: 500,
              };
            }

            // Send reset email
            const resetLink = `http://localhost:3000/reset-password/${token}`;

            const mailOptions = {
              from: process.env.EMAIL,
              to: email,
              subject: "Password Reset Request",
              // text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
              html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>Arniel Email Service/title>
  

</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <p style="font-size:1.1em">Hi,</p><br />
    <p>We received a request to reset your password for your account. If you made this request, please click the link below to reset your password:</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${resetLink}</h2>
    <p style="font-size:0.9em;"><br />If you did not request a password reset, you can safely ignore this email, and your account will remain secure.</p>
    <p>If you need further assistance, feel free to contact our support team.</p>
    <br /> <br />
    <hr style="border:none;border-top:1px solid #eee" />
   
    <p>Best regards,</p> <br />
    <p>The Arniel Team</p>
   
  </div>
</div>
<!-- partial -->
  
</body>
</html>`,
            };

            transporter.sendMail(mailOptions, (err, info) => {
              if (err) {
                return res.status(500).json({ error: "Failed to send email" });
              }

              res.status(200).json({ message: "Password reset email sent" });
            });
          }
        );
      }
    );
  } catch (error) {
    console.error("reset error:", error);
  }
};

export const handleResetPassword = async (token, newPassword) => {
  try {
    pool.query(
      "SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()",
      [token],
      (err, result) => {
        if (err) {
          return {
            success: false,
            message: "Database error",
            status: 500,
          };
        }

        if (result.length === 0) {
          return {
            success: false,
            message: "Invalid or expired token",
            status: 400,
          };
        }

        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        pool.query(
          "UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE reset_token = ?",
          [hashedPassword, token],
          (err, result) => {
            if (err) {
              return {
                success: false,
                message: "Failed to update password",
                status: 500,
              };
            }
            return {
              success: true,
              message: "Password has been reset successfully",
            };
          }
        );
      }
    );
  } catch (error) {
    console.error("reset error:", error);
  }
};
