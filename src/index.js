import app from "./app.js";
import { connectDB } from "./db.js";



const pt = process.env.PORT || 4000;

connectDB();
app.listen(pt);
console.log("server on port ", pt);

