import Stock from "../models/stockModel.js";
import ReturnBill from "../models/returnBillModel.js";
import expressAsyncHandler from "express-async-handler";

const createReturn=expressAsyncHandler(async(req,res)=>
{
    const Products=req.body.Products;
    
    try{
        if(!Products)
        throw new Error("Add atleast one product");

        var totalAmount=0;
        var products=[];
        for(const element of Products){
            const barcode=element.barcode;
            const found=await Stock.findOneAndUpdate({barcode},{$inc:{quantity:element.quantity}});
            totalAmount=totalAmount+(element.quantity*element.rate);
            const id=((found._id).toString()).split(`'`)[0];
            products.push({product: id,barcode:barcode,returnedQuantity: element.quantity, rate: element.rate});
        };
        
        let bill=await ReturnBill.create({totalAmount, products});
        bill=await ReturnBill.findById(bill.id).populate({path:"products.product",select:"-quantity"});
    
        res.status(200).json(bill);
    }
    catch(err)
    {
        res.status(400).json(err.message);
    }
});

const deleteReturnBill=expressAsyncHandler(async(req,res)=>{
    const permission=req.user.isAdmin;
    const id=req.params.id;
    
    if(permission)
    {
    const bill=await ReturnBill.findByIdAndDelete(id);
    res.status(200).json(bill);
    }
    else
    res.status(400).json("You are not authorized to delete Bills!");
})

export {deleteReturnBill, createReturn};