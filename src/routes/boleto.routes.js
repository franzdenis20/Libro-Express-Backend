
import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import{getBoletos,createBoleto,getBoletosViaje} from '../controllers/boleto.controller.js'


const router = Router();



router.get('/boletos', authRequired, getBoletos );
router.get('/boletos/:id', getBoletosViaje );

router.post('/boletos', authRequired, createBoleto );



export default router; 