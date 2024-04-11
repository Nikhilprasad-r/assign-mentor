import express from "express";
import mongoose from "mongoose";
import { student, mentor } from "../shared/db";

const router = express.Router();
const objId = mongoose.Types.ObjectId;

router.post("/newMentor", async (req, res) => {
  try {
    const mentorData = await mentor.findById(req.body.mentorId);
    mentorData.studentsAssigned.push(...req.body.studentsArray);
    await mentorData.save();

    await Promise.all(
      req.body.studentsArray.map(async (stud) => {
        const temp = await student.findById(stud);
        temp.mentorAssigned = req.body.mentorId;
        await temp.save();
      })
    );

    res.send("Mentor Added to Students and updated in mentor document too");
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send("Bad Request");
  }
});

router.post("/modifyMentor", async (req, res) => {
  try {
    const stud = await student.findById(req.body.studentId);
    const oldMentorId = stud.mentorAssigned;
    stud.mentorAssigned = req.body.newMentorId;
    await stud.save();

    const oldment = await mentor.findById(oldMentorId);
    const indexpos = oldment.studentsAssigned.indexOf(
      objId(req.body.studentId)
    );
    if (indexpos > -1) {
      oldment.studentsAssigned.splice(indexpos, 1);
    }
    await oldment.save();

    const newment = await mentor.findById(req.body.newMentorId);
    if (!newment.studentsAssigned.includes(req.body.studentId)) {
      newment.studentsAssigned.push(req.body.studentId);
    }
    await newment.save();

    res.send(
      "Updated mentor to respective student, updated in old mentor and new mentor studentsAssigned list"
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
