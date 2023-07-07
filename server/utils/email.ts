import nodemailer from "nodemailer";
import config from "../utils/config";
import bcrypt from 'bcrypt'

// Function to generate a random verification code
const generateVerificationCode = async (email:string) =>  {
  const codeLength = 6; // Length of the verification code
  const characters = "0123456789abcdefghijklmnopqrstuvwxyz"; // Characters to use for the code
  let code = email;

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

    const salt_rounds = Number(config.SALT_ROUNDS)
    const passwordHash = await bcrypt.hash(code, salt_rounds)
    return passwordHash

}

// Function to send the verification email
async function sendVerificationEmail(email: string, verificationLink: string): Promise<void> {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure the email provider details
    service: "gmail",
    auth: {
      user: `${process.env.MY_EMAIL}`,
      pass: `${process.env.MY_EMAIL_PASSWORD}`,
    },
  });

  // Prepare the email message
  const mailOptions = {
    from: `${process.env.MY_EMAIL}`,
    to: email,
    subject: "Account Verification",
    text: `Click the following link to verify your account: ${verificationLink}`,
    html: `<p>Click the following link to verify your account:</p><p><a href="${verificationLink}">${verificationLink}</a></p>`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}


export { generateVerificationCode, sendVerificationEmail };