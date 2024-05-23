
import { Router } from "express";
import { registerPrestamo,getLibrosPrestados } from "../controllers/prestamo.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();


router.post("/registerPrestamo", registerPrestamo);

router.get("/librosPrestados",authRequired,getLibrosPrestados);


export default router;