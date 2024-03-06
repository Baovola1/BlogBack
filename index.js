import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

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
