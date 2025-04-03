import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRouter from './routes/userRouter.js';
import bookRouter from './routes/bookRouter.js';
import dotenv from "dotenv";
dotenv.config();
import connectDB from './config/db/dbConnect.js';
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', userRouter)

app.use('/books', bookRouter)

app.get("/", (req, res) => {
    res.status(200).json({ message: "hello" });
});

app.listen(8080, () => {
    console.log("Server is running")
})