import express from "express";
import { getCustomer, updateCustomer } from "../controllers/customerControllers.js";
const Router=express.Router();

Router.post("/",getCustomer)
      .delete("/update",updateCustomer)

export default Router;