import express from "express";
import { mentor } from "../shared/db";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await mentor.find();
    res.send(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await mentor.create(req.body);
    res.send(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send("Bad Request");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ment = await mentor
      .findById(req.params.id)
      .populate("studentsAssigned", "name");
    res.send(ment);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
