import express from 'express';
import { addFaq, deleteFaq, getFaqs, updateFaq } from '../controllers/faq.Controller.js';

const FaqRoutes = express.Router();
// Routes
FaqRoutes.post("/", addFaq);       
FaqRoutes.put("/:id", updateFaq);   
FaqRoutes.get("/", getFaqs);                                
FaqRoutes.delete("/:id", deleteFaq);                       

export default FaqRoutes;
