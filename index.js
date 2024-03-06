import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

//Configuration
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000 !");
  });
