// Import necessary modules
import express from "express";
import mongoose from "mongoose";
import { Student, studentSchema } from "./studentModel.js";

// Define Student Router
export const studentRouter = express.Router();

// Define Student APIs
// Create Student API
studentRouter.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  } // Implement Create Student API
});

// Assign or Change Mentor for a Student API
studentRouter.put("/:studentId/mentor/:mentorId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const mentor = await Mentor.findById(req.params.mentorId);
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });

    student.mentor = mentor;
    await student.save();

    res
      .status(200)
      .json({ message: "Mentor assigned to student successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  } // Implement Assign or Change Mentor for a Student API
});

// Select One Student and Assign One Mentor API
studentRouter.put("/:studentId/mentor", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const mentorId = req.body.mentorId;
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });

    student.mentor = mentor;
    await student.save();

    res
      .status(200)
      .json({ message: "Mentor assigned to student successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Show Previously Assigned Mentor for a Particular Student API
studentRouter.get("/:studentId/previous-mentor", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate(
      "mentor"
    );
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json(student.mentor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
studentRouter.get("/", async (req, res) => {
  try {
    // Fetch all students from the database
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
