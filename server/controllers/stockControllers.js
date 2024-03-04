import stock from "../models/stockModel.js";
import asyncHandler from "express-async-handler";

//Create a stock
//POST /api/stock
const addStock=asyncHandler(async(req,res)=>{
    const quantity=req.body.quantity;
    const barcode=req.body.barcode;
    try{
    const product=await stock.findOne({barcode});
    //If product already in stocks, then update its quantity
    if(product)
    {
        const updatedProduct=await stock.findOneAndUpdate({barcode},{
            $inc:{quantity:quantity}
        });
        res.status(200).json(updatedProduct);
    }
    else
    //Create new stock
    {
        const Stock=await stock.create(req.body);
        res.status(201).json(Stock);
    }
}
catch(err)
{
    res.status(400).json(err.message);
}
})

//Find a product
const getProduct=asyncHandler(async(req,res)=>{
    const barcode=req.params.barcode;
    try{
const product=await stock.findOne({barcode});
res.status(200).json(product);
    }
    catch(err)
    {
        res.status(400).json(err.message);
    }
})

//Show all products
const allProducts=asyncHandler(async(req,res)=>{
    const stocks=await stock.find();
    res.status(200).json(stocks);
})

export {addStock,getProduct,allProducts};