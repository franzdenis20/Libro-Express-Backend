import express from "express";
import morgan from "morgan";
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import boletoRoutes from "./routes/boleto.routes.js";
import empleadosRoutes from "./routes/empleados.routes.js"
import adminRoutes from "./routes/admin.routes.js"
import sedesRoutes from "./routes/sede.routes.js"

import prestamoRoutes from "./routes/prestamo.routes.js"

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Configuración de CORS para permitir solicitudes de un origen específico
app.use(cors({
  origin: true, // El origen permitido  
  //origin: "http://localhost:5173", 

  //origin: `${process.env.MY_ORIGIN_API}`,
  credentials: true, // Para permitir el envío de cookies y credenciales de autenticación
}));

console.log(">>>"+process.env.MY_ORIGIN_API)
// Habilitar preflight para todas las rutas
app.options('*', cors());


// Rutas
app.use("/api", authRoutes);
app.use("/api", taskRoutes);
app.use("/api", boletoRoutes);
app.use("/api", empleadosRoutes);
app.use("/api",adminRoutes);
app.use("/api",sedesRoutes);
app.use("/api", prestamoRoutes);

app.head('/', (req, res) => {
  // Manejar la solicitud HEAD a la ruta raíz
  res.status(200).end(); // Responder con un estado 200 OK
});

export default app;
