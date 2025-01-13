import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export async function sendPasswordResetEmail(recipientEmail, token) {
  try {
    // Ensure environment variables are set
    if (!process.env.CLIENT_ORIGIN || !process.env.EMAIL) {
      throw new Error(
        "Missing required environment variables: CLIENT_ORIGIN or EMAIL"
      );
    }

    const resetLink = `${process.env.CLIENT_ORIGIN}/forgot-password?resetToken=${token}`;

    const mailConfigs = {
      from: process.env.EMAIL,
      to: recipientEmail,
      subject: "Password Reset Request",
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset</title>
          </head>
          <body style="font-family: Helvetica, Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
            <div style="padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #f9f9f9;">
              <h2 style="text-align: center; color: #333;">Password Reset Request</h2>
              <p>Hello,</p>
              <p>We received a request to reset your password. Click the link below to reset your password:</p>
              <p><a href="${resetLink}" style="color: #007BFF; text-decoration: none;">Reset Your Password</a></p>
              <p>If you did not request this, you can safely ignore this email. Your password will remain unchanged.</p>
              <p>Thank you,<br>The Arniel Team</p>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailConfigs);

    return {
      success: true,
      message: "Password reset email sent successfully.",
      status: 200,
    };
  } catch (error) {
    throw new Error(error.message || "Failed to send email");
  }
}
