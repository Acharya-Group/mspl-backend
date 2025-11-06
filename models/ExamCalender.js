import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    level: { type: String, required: true },
    examDate: { type: String, required: true },
    registrationDeadline: { type: String, required: true },
    mode: { type: String, required: true, default: "Online" }
  },
  { timestamps: true }
);

const ExamCalender = mongoose.model("ExamCalender", examSchema);

export default ExamCalender;
