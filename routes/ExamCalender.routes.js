import express from 'express';
import { addExam, deleteExam, getExams, updateExam } from '../controllers/examCalender.container.js';

const ExamCalenderRoutes = express.Router();
ExamCalenderRoutes.post("/", addExam);       
ExamCalenderRoutes.put("/:id", updateExam);   
ExamCalenderRoutes.get("/", getExams);                                
ExamCalenderRoutes.delete("/:id", deleteExam);                       

export default ExamCalenderRoutes;
