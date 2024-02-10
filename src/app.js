import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors"

import authRoutes from './routes/auth.routes.js';
import taskRoutes from "./routes/task.routes.js"

const app = express();

app.use(cors({
    origin :'http://localhost:3000',
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser())

app.get("/", (req, res) => {
    const htmlResponse = "<html><head><title>API RESTful</title></head><body><h1>API RESTful</h1></body></html>";
    res.send(htmlResponse);
});
app.use("/api",authRoutes);

app.use("/api", taskRoutes)



export default app;