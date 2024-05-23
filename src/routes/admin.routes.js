import { Router } from "express";
import { getAdministradores, registerAdmin, deleteAdmin } from "../controllers/admin.controller.js";



const router = Router();

router.post('/registerAdmin', registerAdmin);

router.get('/admins/:id', getAdministradores);

router.delete('/admin/:id', deleteAdmin);
export default router;