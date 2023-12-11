import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to the Database');
  })
  .catch((err) => {
    console.log('error is ${err}'); 
  });
 
const app = express();

app.use(express.json()); //so that we can receive json file from when client posts something

app.listen(3000, () => {
  console.log("server listening on port 3000");
});

app.use('/api/user' ,userRoutes);
app.use('/api/auth' ,authRoutes);

app.use((err , req , res , next)=>{
      const statusCode = err.statusCode || 500;
      const message = err.message || 'Interval Server Error';
      return res.status(statusCode).json({
        success : false,
        message,
        statusCode,
      })
});