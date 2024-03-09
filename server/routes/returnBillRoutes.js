import express from "express";
import { createReturn, deleteReturnBill } from "../controllers/returnBillControllers.js";
import validateToken from "../middlewares/tokenHandler.js";

const Router=express.Router();

Router.use("/",validateToken)
Router.post("/create",createReturn)
      .delete("/delete",deleteReturnBill)

export default Router;