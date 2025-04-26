import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import dotenv from "dotenv";

import authRoutes from './routes/authRoutes.js'
import requestRoutes from './routes/requestRoutes.js'
import userRoutes from './routes/userRoutes.js'





dotenv.config();
const app = express();


app.use(
    cors({
      origin: 'http://localhost:8080', // Your frontend's URL
      credentials: true, // Allow cookies to be included
    })
  );
  

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGO_URI = process.env.MONGO_URI;
//calling main function of db
main().then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
});


app.use('/api', authRoutes);
app.use('/api', requestRoutes);
app.use('/api/user/profile', userRoutes);

async function main() {
    await mongoose.connect(MONGO_URI);
}


app.listen(5000, () =>{
    console.log("listening vsdk  ");
})