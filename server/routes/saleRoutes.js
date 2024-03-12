import express from "express";
import { createSale, deleteSaleBill, getAllBills } from "../controllers/saleBillControllers.js";
const Router=express.Router();
import validateToken from "../middlewares/tokenHandler.js";

Router.use("/",validateToken)
Router.get("/all",getAllBills)
Router.post("/create",createSale)
      .delete("/delete/:id",deleteSaleBill)

export default Router;