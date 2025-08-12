import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoutes.js';


//create express app
const app = express();
const server = http.createServer(app);

//configure environment variables
dotenv.config();

//enable cors
app.use(cors());

//parse json requests
app.use(express.json({limit: '4mb'}));


//route setup
app.use("/api/status",(req, res) => res.send("Server is running"));
app.use("/api/auth",userRouter);

await connectDB();

const PORT = process.env.PORT || 5000;

//start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});