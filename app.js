import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";


// env
dotenv.config();

const app = express();
var corsOptions = {
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200 
  }
// app use
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
// app.use(notFound);
// app.use(errorHandler);


const customDirectory = './public/image/product/'; // Replace with your desired directory

app.use('/static', express.static(path.join(__dirname, customDirectory)));

export default app;