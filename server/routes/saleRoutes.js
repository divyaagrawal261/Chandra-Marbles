import express from "express";
import { createSale, deleteSaleBill } from "../controllers/saleBillControllers.js";
const Router=express.Router();
import validateToken from "../middlewares/tokenHandler.js";

Router.use("/",validateToken)
Router.post("/create",createSale)
      .delete("/delete/:id",deleteSaleBill)

export default Router;