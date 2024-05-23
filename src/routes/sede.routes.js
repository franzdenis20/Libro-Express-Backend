


import { Router } from "express";
import { getSedes, registerSede, deleteSede } from "../controllers/sede.controller.js";



const router = Router();

router.post('/registerSede', registerSede)

router.get('/sedes', getSedes);

router.delete('/sede/:id', deleteSede);
export default router;