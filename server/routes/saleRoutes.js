import express from "express";
import { createSale, deleteSaleBill } from "../controllers/saleBillControllers.js";
const Router=express.Router();

Router.post("/create",createSale)
      .delete("/delete",deleteSaleBill)

export default Router;