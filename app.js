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
    // origin: 'https://authorization-sigma.vercel.app',
    // origin: '*',
    // credentials: true,
    origin: process.env.DEV_MODE === 'development' ? 'http://localhost:5173' : 'https://authorization-sigma.vercel.app',
    // origin: `DEV_MODE === 'development' ? 'http://localhost:5173' : 'https://authorization-sigma.vercel.app'`,
    // optionsSuccessStatus: 200
    // origin: 'https://authorization-sigma.vercel.app',
    credentials: true, // Enable credentials (e.g., cookies)
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
