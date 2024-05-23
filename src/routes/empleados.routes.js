import { Router } from "express";
import { getEmpleados, registerEmpleado, deleteEmpleado } from "../controllers/empleados.controller.js";



const router = Router();

router.post('/registerEmpleado', registerEmpleado)

router.get('/empleados', getEmpleados);

router.delete('/empleados/:id', deleteEmpleado);
export default router;