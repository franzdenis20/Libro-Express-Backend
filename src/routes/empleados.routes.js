import { Router } from "express";
import { getEmpleados, registerEmpleado, deleteEmpleado } from "../controllers/empleados.controller.js";
import { authRequired } from "../middlewares/validateToken.js";



const router = Router();

router.post('/registerEmpleado', registerEmpleado)

router.get('/empleados',authRequired, getEmpleados);

router.delete('/empleados/:id', deleteEmpleado);
export default router;