import mongoose from "mongoose";

// Define Student schema
export const studentSchema = new mongoose.Schema({
  name: String,
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" },
});

// Define Student model
export const Student = mongoose.model("Student", studentSchema);
