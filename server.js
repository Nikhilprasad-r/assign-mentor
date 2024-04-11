// Import necessary modules
import express from "express";
import { connectToDB } from "./db.js";
import { mentorRouter } from "./mentor.js";
import { studentRouter } from "./student.js";

// Create Express app
const app = express();
app.use(express.json());

// Connect to MongoDB
connectToDB();

// Use Mentor and Student routers
app.use("/mentors", mentorRouter);
app.use("/students", studentRouter);

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
