import mongoose from "mongoose";

const customerSchema=new mongoose.Schema({
    customerName: {
        type: String,
        required: [true, "Please provide a Customer Name"]
    },
    phone: {
        type: String,
        required: [true, "Please provide a phone number"],
        unique: [true, "Phone number already taken"]
    },
    balanceAmount: {
        type: Number,
        default: 0
    }
})

const Customer=mongoose.model("Customer", customerSchema);

export default Customer;