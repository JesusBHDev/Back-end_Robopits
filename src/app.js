import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

import authRoutes from './routes/auth.routes.js';
import categoriaRoutes from "./routes/categoria.routes.js";
import productoRoutes from "./routes/producto.routes.js";
import empleadosRoutes from './routes/empleados.routes.js';
import CarRoutes from './routes/Car.routes.js';
import PedidoRoutes from  './routes/pedido.routes.js';
import HistorialPedidos from './routes/HistorialPedidos.routes.js'
import FavoritosRoutes from './routes/Favoritos.routes.js'
import OfertasRoutes from './routes/Ofertas.routes.js'
import StripeRoutes from './routes/Stripe.routes.js';

const app = express();

app.use(cors({
    origin: ['https://robopits.online','https://www.robopits.online','http://localhost:3000'],
    credentials: true, // Permitir credenciales (cookies, autorización HTTP, etc.)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("<h1>Hola Mundo desde Express!</h1>");
});

app.use("/api", authRoutes);
app.use("/api", empleadosRoutes);
app.use("/api", categoriaRoutes);
app.use("/api", productoRoutes);
app.use("/api", CarRoutes);
app.use("/api", PedidoRoutes);
app.use("/api", HistorialPedidos);
app.use('/api', FavoritosRoutes);
app.use("/api", OfertasRoutes);
app.use('/api', StripeRoutes);

export default app;
