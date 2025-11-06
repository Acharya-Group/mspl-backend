import express from 'express';
import { addNewsAndEvent, deleteNewsAndEvent, getNewsAndEvent, updateNewsAndEvent } from '../controllers/NewsAndEvent.controller.js';

const NewsAndEventRoute = express.Router();
// Routes
NewsAndEventRoute.post("/", addNewsAndEvent);       
NewsAndEventRoute.put("/:id", updateNewsAndEvent);   
NewsAndEventRoute.get("/", getNewsAndEvent);                              
NewsAndEventRoute.delete("/:id", deleteNewsAndEvent);                       

export default NewsAndEventRoute;
