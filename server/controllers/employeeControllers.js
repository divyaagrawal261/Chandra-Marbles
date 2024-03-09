import Employee from "../models/employeeModel.js";
import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

//View all Employees
//api/Employees/
const showEmployees=expressAsyncHandler(async(req,res)=>{
    const Employees=await Employee.find();
    res.status(200).json(Employees);
})

//Register a Employee
// api/Employees/register
const registerEmployee=expressAsyncHandler(async(req,res)=>{
    const {employeeName,phone,password}=req.body;
    try{ 
    const hashedPassword=await bcrypt.hash(password,10);

    const employee= await Employee.create({employeeName, phone, password: hashedPassword});

    if(!employee)
    throw new Error("Error Creating Employee");

    res.status(201).json(employee);
    }
    catch(err)
    {
        res.status(400).json(err.message);
    }
})

//Details of Employee
const getEmployee=expressAsyncHandler(async(req,res)=>{
    const phone=req.user.phone;
    const employee=await Employee.findOne({phone})
    res.status(200).json(employee);
})

//Login a Employee
// api/Employees/login
const loginEmployee=expressAsyncHandler(async(req,res)=>{
    const {phone, password}=req.body;

    try{
    if(!phone || !password)
    throw new Error("All field are mandatory");

    const employee = await Employee.findOne({phone});

    if(employee && await bcrypt.compare(password,employee.password))
    {
        const accessToken=jwt.sign({
            user:{
                employeeName: employee.employeeName,
                phone: employee.phone,
                isAdmin:employee.isAdmin
            },
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"360m"});
        console.log("Signed in successfully");
        res.status(200).json({Employee,accessToken});
    }
    else
    throw new Error("Invalid Credentials");
}
catch(err)
{
    res.status(400).json(err.message);
}

})

//Change the saleTillDate as per the comission paid to employee
const updateEmployee=expressAsyncHandler(async(req,res)=>{
    const{phone, amount}=req.body;
    try{
        if(!phone || !amount)
        throw new Error("All fields are neccessary");

        if(amount<0)
        throw new Error("Amount should be positive");

        const employee=await Employee.findOneAndUpdate({phone},{$inc:{saleTillDate:-amount}});

        if(!employee)
        throw new Error("Employee does not exist");

        res.status(201).json(employee);
    }
    catch(err)
    {
        res.status(400).json(err.message);
    }
})
export {loginEmployee,registerEmployee,showEmployees,getEmployee,updateEmployee};