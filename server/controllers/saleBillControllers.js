import Stock from "../models/stockModel.js";
import SaleBill from "../models/saleBillModel.js";
import expressAsyncHandler from "express-async-handler";
import Customer from "../models/customerModel.js";
import Employee from "../models/employeeModel.js";

const createSale=expressAsyncHandler(async(req,res)=>
{
    const Products=req.body.Products;
    const {customerName, phone}=req.body;
    const employeePhone=req.user.phone;
    
    try{
        if(!employeePhone)
        throw new Error("Employee Not Logged In");

        if(!phone)
        throw new Error("Enter phone number of the Customer");

        var customer=await Customer.findOne({phone});
        if(!customer)
        {
            customer=await Customer.create({customerName, phone}); 
        }

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
        
        await Customer.findOneAndUpdate({phone}, {$inc:{balanceAmount:totalAmount}});
        await Employee.findOneAndUpdate({phone:employeePhone},{$inc:{saleTillDate:totalAmount}});

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
    const permission=req.user.isAdmin;
    const _id=req.body;
    
    if(permission)
    {
        const bill=await SaleBill.findByIdAndDelete({_id});
        res.status(200).json(bill);
    }
    else
    res.status(400).json("You are not authorized to delete Bills!");
})

export {deleteSaleBill, createSale};