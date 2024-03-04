import customer from "../models/customerModel.js";
import expressAsyncHandler from "express-async-handler";

const getCustomer=expressAsyncHandler(async(req,res)=>{
    const Customer=await customer.find()
    if(Customer)
    res.status(200).json(Customer);
    else
    res.status(401).json({message:"Customer does not exist"});
})

export default getCustomer;