import express from "express";
import { getCustomer, updateCustomer } from "../controllers/customerControllers.js";
const Router=express.Router();

Router.post("/",getCustomer)
      .patch("/update",updateCustomer)

export default Router;