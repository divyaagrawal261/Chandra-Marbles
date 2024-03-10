import express from "express";
import { getCustomers, updateCustomer, getCustomer } from "../controllers/customerControllers.js";
const Router=express.Router();
Router.get("/:phone",getCustomer)
Router.get("/",getCustomers)
      .patch("/update",updateCustomer)

export default Router;