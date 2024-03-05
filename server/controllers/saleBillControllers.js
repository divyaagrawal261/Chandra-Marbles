import Stock from "../models/stockModel.js";
import SaleBill from "../models/saleBillModel.js";
import expressAsyncHandler from "express-async-handler";

const createSale=expressAsyncHandler(async(req,res)=>
{
    const Products=req.body;
    
    try{
        if(!Products)
        throw new Error("Add atleast one product");

        var totalAmount=0;
        var products=[];
        products.forEach(element => {
            const barcode=element.barcode;
            Stock.findOneAndUpdate({barcode},{$inc:{quantity:-element.quantity}});
            totalAmount=totalAmount+(element.quantity*element.rate);
            products.push(element._id);
        });
    
        
        let bill=await SaleBill.create({totalAmount, products});
        bill=await SaleBill.findById(bill.id).populate("products");

        res.status(200).json(bill);
    }
    catch(err)
    {
        res.status(400).json(err.message);
    }
});

const deleteSaleBill=expressAsyncHandler(async(req,res)=>{
    const _id=req.body;

    const bill=await SaleBill.findByIdAndDelete({_id});
    res.status(200).json(bill);
})

export {deleteSaleBill, createSale};