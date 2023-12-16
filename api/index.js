import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to the Database');
  })
  .catch((err) => {
    console.log(err); 
  });
 

  const __dirname = path.resolve();

const app = express();

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use(express.json()); //so that we can receive json file from when client posts something

app.use(cookieParser());

app.listen(3000, () => {
  console.log("server listening on port 3000");
});

app.use('/api/user' ,userRoutes);
app.use('/api/auth' ,authRoutes);

app.use((err , req , res , next)=>{   //error handling middleware
      const statusCode = err.statusCode || 500;
      const message = err.message || 'Interval Server Error';
      return res.status(statusCode).json({
        success : false,
        message,
        statusCode,
      })
});