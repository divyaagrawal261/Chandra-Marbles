import Stock from "../models/stockModel.js";
import ReturnBill from "../models/returnBillModel.js";
import expressAsyncHandler from "express-async-handler";

const newReturnBill=expressAsyncHandler(async(req,res)=>
{
    const Products=req.body;
    
    try{
        if(!Products)
        throw new Error("Add atleast one product");

        var totalAmount=0;
        var products=[];
        products.forEach(element => {
            const barcode=element.barcode;
            Stock.findOneAndUpdate({barcode},{$inc:{quantity:element.quantity}});
            totalAmount=totalAmount+(element.quantity*element.rate);
            products.push(element._id);
        });
    
        
        let bill=await ReturnBill.create({totalAmount, products});
        bill=await ReturnBill.findById(bill.id).populate("products");

        res.status(200).json(bill);
    }
    catch(err)
    {
        res.status(400).json(err.message);
    }
});

const deleteReturnBill=expressAsyncHandler(async(req,res)=>{
    const _id=req.body;

    const bill=await ReturnBill.findByIdAndDelete({_id});
    res.status(200).json(bill);
})

export {deleteReturnBill, newReturnBill};