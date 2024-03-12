import Stock from "../models/stockModel.js";
import SaleBill from "../models/saleBillModel.js";
import expressAsyncHandler from "express-async-handler";
import Customer from "../models/customerModel.js";
import Employee from "../models/employeeModel.js";
import express from "express";

const createSale=expressAsyncHandler(async(req,res)=>
{
    const Products=req.body.Products;
    const {customerName, phone, paid, discount}=req.body;
    const employeePhone=req.user.phone;
    const employeeName=req.user.employeeName;
    
    try{
        if(!employeePhone)
        throw new Error("Employee Not Logged In");

        if(!phone)
        throw new Error("Enter phone number of the Customer");

        if(paid<0)
        throw new Error("Amount paid cannot be negative");
    
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
            totalAmount=totalAmount+(element.quantity*element.rate);
            const id=((found._id).toString()).split(`'`)[0];
            products.push({product: id,barcode:barcode,orderedQuantity: element.quantity, rate: element.rate});
        };

        const balance=Number(totalAmount)-Number(discount)-Number(paid);
        
        await Customer.findOneAndUpdate({phone}, {$inc:{balanceAmount:balance}});
        await Employee.findOneAndUpdate({phone:employeePhone},{$inc:{saleTillDate:totalAmount}});

        let bill=await SaleBill.create({employeeName, phone, totalAmount, products, paid,discount, balance});
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
    const id=req.params.id;
    
    if(permission)
    {
        const bill=await SaleBill.findByIdAndDelete(id);
        res.status(200).json(bill);
    }
    else
    res.status(400).json("You are not authorized to delete Bills!");
})

const getAllBills=expressAsyncHandler(async(req,res)=>{
    const bills=await SaleBill.find();
    if(req.user.isAdmin)
    res.status(200).json(bills);
    else
    res.status(400).json("Unauthorized");
})

export {deleteSaleBill, createSale, getAllBills};