import express from "express";
import { student } from "../shared/db";

const router = express.Router();

router.get("/", async (req, res) => {
  console.log("get all Students");
  try {
    const data = await student.find();
    res.send(data);
  } catch (e) {
    res.send(e);
  }
});

router.post("/", async (req, res) => {
  console.log("Student create route");
  try {
    const data = await student.create({
      name: req.body.name,
      email: req.body.email,
      course: req.body.course,
      mentorAssigned: req.body.mentorAssigned,
    });
    res.send(data);
  } catch (e) {
    console.log(e.message, "error");
    res.status(500).send("Error in student POST");
  }
});

export default router;
