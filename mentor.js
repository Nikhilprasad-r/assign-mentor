// Import necessary modules
import express from "express";
import mongoose from "mongoose";
import { Mentor, mentorSchema } from "./mentorModel.js";

// Define Mentor Router
export const mentorRouter = express.Router();

// Define Mentor APIs
// Create Mentor API
mentorRouter.post("/", async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).json(mentor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Assign Student to Mentor API
mentorRouter.post("/:mentorId/students/:studentId", async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId);
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });

    const student = await Student.findById(req.params.studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    mentor.students.push(student);
    await mentor.save();

    student.mentor = mentor;
    await student.save();

    res
      .status(200)
      .json({ message: "Student assigned to mentor successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add Multiple Students to a Mentor API
mentorRouter.post("/:mentorId/students", async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId);
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });

    const studentIds = req.body.studentIds;
    const students = await Student.find({ _id: { $in: studentIds } });
    if (!students)
      return res.status(404).json({ message: "Students not found" });

    mentor.students.push(...students);
    await mentor.save();

    for (const student of students) {
      student.mentor = mentor;
      await student.save();
    }

    res.status(200).json({ message: "Students added to mentor successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Show All Students for a Particular Mentor API
mentorRouter.get("/:mentorId/students", async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId).populate(
      "students"
    );
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });

    res.status(200).json(mentor.students);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
mentorRouter.get("/", async (req, res) => {
  try {
    // Fetch all mentors and populate students field
    const mentors = await Mentor.find().populate("students");
    res.status(200).json(mentors);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
