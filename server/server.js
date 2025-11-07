import express from "express";
import "dotenv/config";
import dbConnect from "./config/database.js";
import userRouter from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRouter from "./routes/post.route.js";

const app = express();

// CORS configuration using environment variable
const corsOptions = {
    // Change this from a string to an array
    origin: [
        process.env.FRONTEND_URL || 'http://localhost:5173',
        'https://kloud-shark.vercel.app' // <-- Add your new origin here
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use('/api/user',userRouter);
app.use('/api/post',postRouter)

const port = process.env.PORT || 4000;

dbConnect();

app.get('/',(req,res)=>{
    return res.send("Server is live");
})

app.listen( port, ()=>{
    console.log(`Server is listening on ${port}`);
    console.log(`CORS configured for frontend: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
} )