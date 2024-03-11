import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stock",
  },
  barcode:{type:String},
  orderedQuantity: Number,
  rate:Number 
});

const SaleBillSchema = new mongoose.Schema({
  employeeName:{
    type:String
  },
  phone:{
    type:String //Customer Phone
  },
  date: {
    type: Date,
    default: Date.now,
  },
  products: [productSchema],
  totalAmount: {
    type: Number,
    required: true,
  },
  paid:{
    type:Number,
    default:0
  },
  balance:{
    type:Number
  },
  discount:{
    type:Number //Discount Amount
  }
});

const SaleBill = mongoose.model("SaleBill", SaleBillSchema);

export default SaleBill;
