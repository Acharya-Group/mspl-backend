import express from 'express';
import { addNotice, deleteNotice, getNotices, updateNotice } from '../controllers/notice.controller.js';

const NoticeRoutes = express.Router();
// Routes
NoticeRoutes.post("/", addNotice);       
NoticeRoutes.put("/:id", updateNotice);   
NoticeRoutes.get("/", getNotices);                                
NoticeRoutes.delete("/:id", deleteNotice);                       

export default NoticeRoutes;
