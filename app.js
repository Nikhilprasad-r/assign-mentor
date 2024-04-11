import express from "express";
import cors from "cors";
import { dbConnect } from "./shared/db";
import studentRoute from "./routes/student";
import mentorRoute from "./routes/mentor";
import assignMentorToStudent from "./routes/assignMentortoStudent";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Working fine...");
});

app.use("/student", studentRoute);
app.use("/mentor", mentorRoute);
app.use("/assignmentor", assignMentorToStudent);

app.listen(PORT, async () => {
  await dbConnect();
  console.log(`Server started on port ${PORT}`);
});
