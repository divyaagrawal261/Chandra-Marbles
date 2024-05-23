import express from "express";
import { addToPrintQueue, createSale, deleteSaleBill, getAllBills, showPrintQueue, updatePrintQueue } from "../controllers/saleBillControllers.js";
const Router=express.Router();
import validateToken from "../middlewares/tokenHandler.js";

Router.use("/",validateToken)
Router.get("/all",getAllBills)
Router.post("/create",createSale)
      .delete("/delete/:id",deleteSaleBill)
Router.patch("/print/:id",updatePrintQueue)
      .patch("/print/new/:id",addToPrintQueue)
      .get("/print",showPrintQueue)
export default Router;