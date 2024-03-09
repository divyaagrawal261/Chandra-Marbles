import express from "express";
import { createReturn, deleteReturnBill } from "../controllers/returnBillControllers.js";
const Router=express.Router();

Router.post("/create",createReturn)
      .delete("/delete",deleteReturnBill)

export default Router;