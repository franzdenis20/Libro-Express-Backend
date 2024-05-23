
import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import{getTasks,getTask,createTask,updateTask,deleteTask,getTasksPublick} from '../controllers/tasks.controller.js'


const router = Router();

router.get('/tasks/:id', getTasksPublick );

router.get('/tasks/data/:id', authRequired, getTask );

router.post('/tasks', createTask );

router.delete('/tasks/:id', deleteTask );

router.put('/tasks/:id', updateTask )

export default router; 