import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDatabase from './config/MongoDb.js';
import ImportData from './Dataimport.js';
import roomRoute from './Routes/RoomRoutes.js';
import { errorHandler, notFound } from './Middleware/Errors.js';
import authRouter from "./Routes/AuthRoutes.js"
import cookieParser from 'cookie-parser';
import userRouter from './Routes/UserRouter.js';
import bookRouter from './Routes/BookRoutes.js';
import employeeRouter from './Routes/EmployeeRoutes.js';
import categoriesRouter from './Routes/CategoriesRoutes.js';

dotenv.config();
connectDatabase();
const app = express();
app.use(cookieParser());
app.use(express.json());

// API
app.use(cors());
app.use("/api/import", ImportData);
app.use("/api/rooms", roomRoute);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/category", categoriesRouter);
app.use("/api/booking", bookRouter);

// basic route
app.get("/", (req,res,next) => {
    console.log('HI');
    res.send("Hello new Project")
})

// ERROR MIDDLEWARE
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server running port ${PORT}`));