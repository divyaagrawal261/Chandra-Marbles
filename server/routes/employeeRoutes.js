import express from "express";
import { getEmployee, loginEmployee, registerEmployee, showEmployees, updateEmployee } from "../controllers/employeeControllers.js";
import validateToken from "../middlewares/tokenHandler.js";
const Router=express.Router();
Router.get("/all",showEmployees);
Router.post("/login",loginEmployee)
Router.use("/",validateToken)
      .post("/register",registerEmployee)
      .get("/",getEmployee)
      .patch("/pay",updateEmployee)

export default Router;