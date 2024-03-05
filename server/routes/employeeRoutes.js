import express from "express";
import { getEmployee, loginEmployee, registerEmployee, showEmployees } from "../controllers/employeeControllers";
const Router=express.Router();

Router.post("/login",loginEmployee)
      .post("/register",registerEmployee)
      .get("/",getEmployee)
      .get("/all",showEmployees)


export default Router;