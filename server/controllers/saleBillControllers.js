import Stock from "../models/stockModel.js";
import SaleBill from "../models/saleBillModel.js";
import expressAsyncHandler from "express-async-handler";

const createSale=expressAsyncHandler(async(req,res)=>
{
    const Products=req.body.Products;
    
    try{
        if(!Products)
        throw new Error("Add atleast one product");

        var totalAmount=0;
        var products=[];
        for(const element of Products){
            const barcode=element.barcode;
            const found=await Stock.findOneAndUpdate({barcode},{$inc:{quantity:-element.quantity}});
            totalAmount=totalAmount+(element.quantity*found.rate);
            const id=((found._id).toString()).split(`'`)[0];
            products.push({product: id,barcode:barcode,orderedQuantity: element.quantity});
        };
        
        let bill=await SaleBill.create({totalAmount, products});
        bill=await SaleBill.findById(bill.id).populate({path:"products.product",select:"-quantity"});
    
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