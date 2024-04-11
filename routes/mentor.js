import express from "express";
import { mentor } from "../shared/db";

const router = express.Router();

// GET all mentors
router.get("/", async (req, res) => {
  try {
    const data = await mentor.find();
    res.send(data);
  } catch (error) {
    console.error("Error getting mentors:", error);
    res.status(500).send("Internal Server Error");
  }
});

// POST create a mentor
router.post("/", async (req, res) => {
  try {
    const data = await mentor.create(req.body);
    res.send(data);
  } catch (error) {
    console.error("Error creating mentor:", error);
    res.status(400).send("Bad Request");
  }
});

// GET all students for a particular mentor
router.get("/:id", async (req, res) => {
  try {
    const ment = await mentor
      .findById(req.params.id)
      .populate("studentsAssigned", "name");
    res.send(ment);
  } catch (error) {
    console.error("Error getting students for mentor:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
