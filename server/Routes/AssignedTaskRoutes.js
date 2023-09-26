const express = require("express");
const router = express.Router();
const AssignedTaskModel = require("../model/AssignedTaskModel");
const nodemailer = require("nodemailer");

// Define a route to handle the assignment of a project
router.post("/assignProject", async (req, res) => {
  try {
    const {
      projectTitle,
      projectDescription,
      projectManager,
      managerEmail,
      UnitHeadEmail,
    } = req.body;

    // Create a new AssignedTask document and save it to the database
    const newTask = new AssignedTaskModel({
      projectTitle,
      projectDescription,
      projectManager,
      managerEmail,
      UnitHeadEmail,
    });

    await newTask.save();

    // Create a Nodemailer transporter with your Gmail account
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "karthiynot2108@gmail.com", // Your Gmail address
        pass: "ihnsbfwigpcqfcrv", // Your Gmail password
      },
    });

    // Send an email to the project manager
    const mailOptions = {
      from: "karthiynot2108@gmail.com", // Your Gmail address
      to: managerEmail,
      subject: "New Project Assignment",
      text: `You have been assigned a new project. Project Description: ${projectDescription}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log("Email sent: " + info.response);
        res
          .status(201)
          .json({ message: "Project assigned successfully and email sent!" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//getting the assigned tasks

router.get("/get-assignedtasks", async (req, res) => {
  try {
    const { userEmail } = req.query;

    const TaskData = await AssignedTaskModel.find({ UnitHeadEmail: userEmail });

    res.status(200).json(TaskData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
