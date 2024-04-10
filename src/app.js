import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors"

import authRoutes from './routes/auth.routes.js';
import taskRoutes from "./routes/task.routes.js";
import categoriaRoutes from "./routes/categoria.routes.js";
import productoRoutes from "./routes/producto.routes.js";
import empleadosRoutes from './routes/empleados.routes.js'
const app = express();
app.get("/", (req, res) => {
    res.send("<h1>Hola Mundo desde Express!</h1>");
});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://www.robopits.online");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors({
    origin :'https://robopits.online',
    credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser())


app.use("/api",authRoutes);
app.use("/api", empleadosRoutes)

app.use("/api",taskRoutes);

app.use("/api", categoriaRoutes);

app.use("/api", productoRoutes);

export default app;
