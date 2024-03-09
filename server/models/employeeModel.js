import mongoose from "mongoose";

const employeeSchema=new mongoose.Schema({
    employeeName: {
        type: String,
        required: [true, "Please provide a Employee Name"]
    },
    phone: {
        type: String,
        required: [true, "Please provide a phone number"],
        unique: [true, "Phone number already taken"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    saleTillDate:{
        type:Number,
        default:0
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

const Employee=mongoose.model("Employee", employeeSchema);

export default Employee;