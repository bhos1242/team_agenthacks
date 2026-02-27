import nodemailer from "nodemailer";

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Email templates
export const getOTPEmailTemplate = (otp: string, name?: string) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f4;
    }
    .container {
      background: white;
      border-radius: 10px;
      padding: 40px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #2563eb;
      margin: 0;
      font-size: 24px;
    }
    .otp-box {
      background: #f8fafc;
      border: 2px dashed #cbd5e1;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      margin: 30px 0;
    }
    .otp-code {
      font-size: 36px;
      font-weight: bold;
      letter-spacing: 8px;
      color: #2563eb;
      margin: 10px 0;
    }
    .info-text {
      color: #64748b;
      font-size: 14px;
      margin-top: 10px;
    }
    .footer {
      margin-top: 30px;
      text-align: center;
      color: #94a3b8;
      font-size: 12px;
    }
    .warning {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 12px;
      margin: 20px 0;
      border-radius: 4px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Email Verification</h1>
    </div>
    
    ${name ? `<p>Hi ${name},</p>` : '<p>Hi there,</p>'}
    
    <p>Thank you for signing up! To complete your registration, please verify your email address using the OTP code below:</p>
    
    <div class="otp-box">
      <p style="margin: 0; color: #64748b; font-size: 14px;">Your OTP Code</p>
      <div class="otp-code">${otp}</div>
      <p class="info-text">This code will expire in 10 minutes</p>
    </div>
    
    <p>Enter this code on the verification page to activate your account.</p>
    
    <div class="warning">
      <strong>⚠️ Security Notice:</strong> Never share this code with anyone. Our team will never ask for this code.
    </div>
    
    <p style="margin-top: 30px;">If you didn't request this code, please ignore this email.</p>
    
    <div class="footer">
      <p>This is an automated message, please do not reply to this email.</p>
      <p>&copy; ${new Date().getFullYear()} Your App. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
};

export const getPasswordResetEmailTemplate = (
  resetLink: string,
  name?: string
) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f4;
    }
    .container {
      background: white;
      border-radius: 10px;
      padding: 40px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #dc2626;
      margin: 0;
      font-size: 24px;
    }
    .button {
      display: inline-block;
      padding: 14px 32px;
      background: #2563eb;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      margin: 20px 0;
    }
    .button:hover {
      background: #1d4ed8;
    }
    .link-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 15px;
      margin: 20px 0;
      word-break: break-all;
      font-size: 12px;
      color: #64748b;
    }
    .warning {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 12px;
      margin: 20px 0;
      border-radius: 4px;
      font-size: 14px;
    }
    .footer {
      margin-top: 30px;
      text-align: center;
      color: #94a3b8;
      font-size: 12px;
    }
    .center {
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔒 Password Reset Request</h1>
    </div>
    
    ${name ? `<p>Hi ${name},</p>` : '<p>Hi there,</p>'}
    
    <p>We received a request to reset your password. Click the button below to create a new password:</p>
    
    <div class="center">
      <a href="${resetLink}" class="button">Reset Password</a>
    </div>
    
    <p style="color: #64748b; font-size: 14px;">Or copy and paste this link into your browser:</p>
    <div class="link-box">${resetLink}</div>
    
    <p style="color: #64748b; font-size: 14px;">This link will expire in 1 hour for security reasons.</p>
    
    <div class="warning">
      <strong>⚠️ Security Notice:</strong> If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
    </div>
    
    <div class="footer">
      <p>This is an automated message, please do not reply to this email.</p>
      <p>&copy; ${new Date().getFullYear()} Your App. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
};

// Send OTP email
export const sendOTPEmail = async (email: string, otp: string, name?: string) => {
  try {
    await transporter.sendMail({
      from: `"Your App" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Verify Your Email - OTP Code",
      html: getOTPEmailTemplate(otp, name),
    });
    return { success: true };
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return { success: false, error };
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (
  email: string,
  resetLink: string,
  name?: string
) => {
  try {
    await transporter.sendMail({
      from: `"Your App" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Reset Your Password",
      html: getPasswordResetEmailTemplate(resetLink, name),
    });
    return { success: true };
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return { success: false, error };
  }
};

// Donation Receipt Template
export const getDonationReceiptTemplate = (
  donation: { name: string; amount: number; orderId: string | null; require80G: boolean }
) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Donation Receipt</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; }
    .container { background: white; border-radius: 10px; padding: 40px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .header { text-align: center; margin-bottom: 30px; }
    .header h1 { color: #16a34a; margin: 0; font-size: 24px; }
    .receipt-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 20px; margin: 20px 0; }
    .receipt-row { display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding: 10px 0; }
    .receipt-row:last-child { border-bottom: none; }
    .amount { font-size: 24px; font-weight: bold; color: #16a34a; text-align: center; margin: 20px 0; }
    .footer { margin-top: 30px; text-align: center; color: #94a3b8; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Your Donation! ❤️</h1>
    </div>
    <p>Dear ${donation.name},</p>
    <p>We have successfully received your generous contribution. Your support makes a huge difference!</p>
    
    <div class="amount">₹${donation.amount}</div>
    
    <div class="receipt-box">
      <div class="receipt-row"><strong>Order ID:</strong> <span>${donation.orderId || "N/A"}</span></div>
      <div class="receipt-row"><strong>Date:</strong> <span>${new Date().toLocaleDateString('en-IN')}</span></div>
      ${donation.require80G ? `<div class="receipt-row"><strong>80G Receipt:</strong> <span>Requested (Will be sent separately)</span></div>` : ''}
    </div>
    
    <p>If you have any questions about this receipt, please contact our support team.</p>
    
    <div class="footer">
      <p>This is an automated receipt from Seva Samarpan.</p>
    </div>
  </div>
</body>
</html>
  `;
};

// Send donation receipt email
export const sendDonationReceipt = async (donation: {
  email: string;
  name: string;
  amount: number;
  orderId: string | null;
  require80G: boolean
}) => {
  try {
    if (!donation || !donation.email) return { success: false, error: "No email provided" };

    await transporter.sendMail({
      from: `"Seva Samarpan" <${process.env.SMTP_USER}>`,
      to: donation.email,
      subject: "Thank You for Your Donation! - Receipt",
      html: getDonationReceiptTemplate(donation),
    });
    return { success: true };
  } catch (error) {
    console.error("Error sending donation receipt email:", error);
    return { success: false, error };
  }
};

