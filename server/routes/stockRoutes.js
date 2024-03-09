import express from "express";
import { addStock, getProduct, allProducts} from "../controllers/stockControllers.js";
const Router=express.Router();

Router.post("/create",addStock)
      .get("/:barcode",getProduct)
      .get("/all",allProducts)

export default Router;