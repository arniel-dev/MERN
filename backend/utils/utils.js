import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export async function sendPasswordResetEmail(recipientEmail, token) {
  const resetLink = `${process.env.CLIENT_ORIGIN}/reset-password/${token}`;

  const mail_configs = {
    from: process.env.EMAIL,
    to: recipientEmail,
    subject: "Password Reset Request",
    html: `<!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Reset</title>
              </head>
              <body style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 1.6;">
                <div style="margin: 50px auto; width: 70%; padding: 20px 0; font-size: 1.1em;">
                  <p>Hi,</p>
                  <p>We received a request to reset your password for your account. If you made this request, please click the link below to reset your password:</p>
                  <h3 style="background: #ffff00;" >${resetLink}</h3>
                  <p>If you did not request a password reset, you can safely ignore this email, and your account will remain secure.</p>
                  <p>If you need further assistance, feel free to contact our support team.</p>
                  <hr style="border: none; border-top: 1px solid #eee;">
                  <p>Best regards,</p>
                  <p>The Arniel Team</p>
                </div>
              </body>
            </html>`,
  };

  return await transporter
    .sendMail(mail_configs)
    .then(() => {
      return {
        success: true,
        message: "Password reset email sent successfully.",
        status: 200,
      };
    })
    .catch(() => {
      return {
        success: false,
        message: error.message || "Failed to send email",
        status: 500,
      };
    });
}
