import ExamCalender from "../models/ExamCalender.js";

// 📌 Add Exam
 const addExam = async (req, res) => {
  try {
    const { level, examDate, registrationDeadline, mode } = req.body;

    if (!level?.trim()) {
      return res.status(400).json({ error: "Level is required" });
    }

    if (!examDate?.trim()) {
      return res.status(400).json({ error: "Exam Date is required" });
    }

    if (!registrationDeadline?.trim()) {
      return res.status(400).json({ error: "Registration Deadline is required" });
    }

    const exam = new ExamCalender({
      level,
      examDate,
      registrationDeadline,
      mode: mode || "Online",
    });

    const savedExam = await exam.save();

    return res.status(201).json({
      message: "Exam added successfully",
      exam: savedExam,
    });
  } catch (error) {
    console.error("Error adding Exam:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// 📌 Update Exam
 const updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const { level, examDate, registrationDeadline, mode } = req.body;

    const exam = await ExamCalender.findById(id);
    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }

    if (level) exam.level = level;
    if (examDate) exam.examDate = examDate;
    if (registrationDeadline) exam.registrationDeadline = registrationDeadline;
    if (mode) exam.mode = mode;

    const updatedExam = await exam.save();

    return res.status(200).json({
      message: "Exam updated successfully",
      exam: updatedExam,
    });
  } catch (error) {
    console.error("Error updating Exam:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// 📌 Get All Exams
 const getExams = async (req, res) => {
  try {
    const exams = await ExamCalender.find().sort({ createdAt: -1 });
    return res.status(200).json({ exams });
  } catch (error) {
    console.error("Error fetching Exams:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// 📌 Delete Exam
 const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExam = await ExamCalender.findByIdAndDelete(id);
    if (!deletedExam) {
      return res.status(404).json({ error: "Exam not found" });
    }

    return res.status(200).json({ message: "Exam deleted successfully" });
  } catch (error) {
    console.error("Error deleting Exam:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { addExam, updateExam, getExams, deleteExam };