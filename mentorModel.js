import mongoose from "mongoose";

// Define Mentor schema
export const mentorSchema = new mongoose.Schema({
  name: String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

// Define Mentor model
export const Mentor = mongoose.model("Mentor", mentorSchema);
