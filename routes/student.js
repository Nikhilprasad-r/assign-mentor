import express from "express";
import { student } from "../shared/db";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await student.find();
    res.send(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await student.create(req.body);
    res.send(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send("Bad Request");
  }
});

export default router;
