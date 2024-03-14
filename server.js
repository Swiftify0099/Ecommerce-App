import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import productRouter from "./routes/productRouter.js"
import catgoryRouts from "./routes/categoryRouts.js"
import connectDB from "./db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors"
import  Path from "path";
import path from "path";
//configure env
dotenv.config();
 const orrgen={
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}


//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors(orrgen))
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(__dirname,'./client/build'))

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category",catgoryRouts);
app.use('/api/v1/product',productRouter)
//rest api
app.use("/", function  (req, res)  {
  res.sendFile(path.join(__dirname,'./client/build/index.html'));
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white );
});