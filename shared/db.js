import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    });
    console.log("DB Connected");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process on database connection failure
  }
};

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  course: {
    type: String,
    required: true,
  },
  mentorAssigned: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "mentor",
  },
});

const mentorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  expertise: {
    type: String,
    required: true,
  },
  studentsAssigned: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
    },
  ],
});

const student = mongoose.model("student", studentSchema);
const mentor = mongoose.model("mentor", mentorSchema);

export { dbConnect, student, mentor };
