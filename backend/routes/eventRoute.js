import express from 'express'
import {createEvent,deleteEvent,getEvent,getEvents, updateEvent}  from '../controller/eventController.js'
import authMiddlewere from '../middlewere/auth.js';


 export const eventRouter = express.Router();

eventRouter.post('/new/event',authMiddlewere, createEvent)
eventRouter.get('/eventList',authMiddlewere,getEvents);
eventRouter.delete('/delete/:id',authMiddlewere,deleteEvent);
eventRouter.get('/:id',authMiddlewere,getEvent);
eventRouter.put('/update/:id',authMiddlewere,updateEvent);


