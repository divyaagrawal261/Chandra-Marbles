import express from "express";
import connectDb from "./config/connection.js";
import dotenv from "dotenv";
import customerRoutes from "./routes/customerRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import salesRoutes from "./routes/saleRoutes.js";
import returnRoutes from "./routes/returnBillRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import cors from "cors";
dotenv.config();

connectDb();
const app=express();
app.use(cors());
const port=process.env.PORT || 5001; 

app.use(express.json());
app.use("/api/employee",employeeRoutes);
app.use("/api/sale",salesRoutes);
app.use("/api/customer",customerRoutes);
app.use("/api/stock",stockRoutes);
app.use("/api/return",returnRoutes);

app.listen(port,()=>{
    console.log(`Server is listening on the port ${port}...`);
})