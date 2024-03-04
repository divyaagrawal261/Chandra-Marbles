import mongoose from "mongoose";

const stockSchema=new mongoose.Schema({
    barcode:{
        type:String,
        required: [true, "Please enter a barcode"],
        unique: [true, "Barcode already taken"]
    },
    company:{
        type: String,
        required: [true, "Please provide a company name"]
    },
    size: {
        type: String,
        required: [true, "Please provide a size"]
    },
    numberOfBoxes: {
        type:Number,
        default: 0
    },
    designName:{
        type:String,
        required:[true, "Please provide a Design Name"]
    },
    quality:{
        type: String,
        required: [true, "Please enter a quality"]
    },
    rate:{
        type:Number,
        required:[true, "Please provide a rate"]
    }
})

const Stock=mongoose.model("Stock", stockSchema);

export default Stock;