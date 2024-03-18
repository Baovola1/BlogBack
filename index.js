import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';

//Configuration
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

//CONNEXION mongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(process.env.PORT, () => {
    console.log("Server is running!");
  });

  
  app.use('/user', userRoutes);
  app.use('/auth', authRoutes);

  //create a middelware
  app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success:false,
      statusCode,
      message
    })
  })
  