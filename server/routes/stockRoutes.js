import express from "express";
import { addStock, getProduct, allProducts} from "../controllers/stockControllers.js";
const Router=express.Router();

Router.get("/all",allProducts)
Router.post("/create",addStock)
      .get("/:barcode",getProduct)

export default Router;