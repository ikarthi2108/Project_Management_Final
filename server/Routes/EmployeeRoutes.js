// server/Routes/EmployeeRoutes.js

const express = require("express");
const router = express.Router();
const EmployeeModel = require("../model/EmployeeModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

// Define the function to generate a random password
function generateRandomPassword() {
  const length = 8; // You can adjust the length of the password
  const charset =
    "abcdeABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }
  return password;
}

// Create a Nodemailer transporter with your Gmail account
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "karthiynot2108@gmail.com", // Your Gmail address
    pass: "ihnsbfwigpcqfcrv", // Your Gmail password
  },
});

// Route to add a new employee
router.post("/add-employee", async (req, res) => {
  try {
    // Generate a random password for the new employee
    const password = generateRandomPassword();

    // Bcrypt hash of the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new employee document using the EmployeeModel
    const newEmployee = new EmployeeModel({
      ...req.body,
      Password: hashedPassword, // Store the hashed password
    });

    // Save the new employee to the database
    await newEmployee.save();

    // Send an email with the actual generated password
    const mailOptions = {
      from: "karthiynot2108@gmail.com", // Your Gmail address
      to: req.body.Email, // Employee's email from the request
      subject: "Your New Employee Password",
      text: `Hello,\n\nYour new password is: ${password}\n\nPlease keep it secure. If you wish, you can change the password using the "Forgot Password" option.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log("Email sent: " + info.response);
        res.status(201).json({ message: "Employee added successfully" });
      }
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
