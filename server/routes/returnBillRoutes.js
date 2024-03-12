import express from "express";
import { createReturn, deleteReturnBill, getAllBills } from "../controllers/returnBillControllers.js";
import validateToken from "../middlewares/tokenHandler.js";

const Router=express.Router();

Router.use("/",validateToken)
Router.get("/all",getAllBills)
Router.post("/create",createReturn)
      .delete("/delete/:id",deleteReturnBill)

export default Router;