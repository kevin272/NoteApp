import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import NoteRoutes from './routes/note.route.js';
import path from "path";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
const __dirname = path.resolve();

app.use(express.json());

app.use("/api/notes", NoteRoutes);

if (process.env.NODE_ENV ==="production") {
    app.use(express.static(path.join(__dirname, "/FE/dist")));

    app.get("*",(req,res) =>{
        res.sendFile(path.resolve(__dirname,"frontend","dist",ïndex.html));
    })
}

app.listen (PORT,() => {
    connectDB();
    console.log('Server Started at http://localhost:'+ PORT)
}); 