import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoDBConnection from "./config/db.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import userRoute from "./route/userRoute.js";
import authRoute from "./route/authRoute.js";
import brandRoute from "./route/brandRoute.js";
import tagRoute from "./route/tagRoute.js";
import categoryRoute from "./route/categoryRoute.js";
import permissionRoute from "./route/permissionRoute.js";
import roleRoute from "./route/roleRoute.js";
import productRoute from "./route/productRoute.js";
import morgan from "morgan";

// set environment variables

dotenv.config();
const PORT = process.env.PORT || 4040;

// express initialization

const app = express();

// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
    // origin: "https://wolmart-project-dagg.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan("dev"));

// static folder

app.use(express.static("public"));

// routing

app.use("/api/v1/user", userRoute);
app.use("/api/v1/permission", permissionRoute);
app.use("/api/v1/role", roleRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/tag", tagRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/auth", authRoute);

// error handler

app.use(errorHandler);

// app listener

app.listen(PORT, () => {
  mongoDBConnection();
  console.log(`Server Is Running on port ${PORT}`.bgGreen.black);
});
