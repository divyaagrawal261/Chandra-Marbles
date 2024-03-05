import express from "express";
import { newReturnBill, deleteReturnBill } from "../controllers/returnBillControllers.js";
const Router=express.Router();

Router.post("/create",newReturnBill)
      .delete("/delete",deleteReturnBill)

export default Router;