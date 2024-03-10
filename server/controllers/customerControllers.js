import customer from "../models/customerModel.js";
import expressAsyncHandler from "express-async-handler";

const getCustomers=expressAsyncHandler(async(req,res)=>{
    const Customer=await customer.find()
    if(Customer)
    res.status(200).json(Customer);
    else
    res.status(401).json({message:"Customer does not exist"});
})

const updateCustomer=expressAsyncHandler(async(req,res)=>{
    const {Amount,phone}=req.body;
    try{
        if(!Amount || !phone)
        throw new Error("All fields are neccessary");

        const Customer=await customer.findOneAndUpdate({phone},{$inc:{balanceAmount:-Amount}}); 

        if(!Customer)
        throw new Error("Customer does not exist");

        res.status(201).json(Customer);
    }
    catch(err)
    {
        res.status(400).json(err.message);
    }
})

const getCustomer=expressAsyncHandler(async(req,res)=>{
    const Customer=await customer.findOne({phone: req.params.phone});
    if(Customer)
    res.status(200).json(Customer);
    else
    res.status(401).json({message:"Customer does not exist"});
})
export  {getCustomers, updateCustomer, getCustomer};