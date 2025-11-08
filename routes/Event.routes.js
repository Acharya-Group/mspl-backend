import express from 'express';
import { addEvent, deleteEvent, getEvents, updateEvent } from '../controllers/event.controller.js';

const EventRoutes = express.Router();
// Routes
EventRoutes.post("/", addEvent);       
EventRoutes.put("/:id", updateEvent);   
EventRoutes.get("/", getEvents);                                
EventRoutes.delete("/:id", deleteEvent);                       

export default EventRoutes;
