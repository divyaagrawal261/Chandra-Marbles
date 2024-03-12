import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stock",
  },
  barcode:{type:String},
  returnedQuantity: Number, 
  rate:Number
});

const ReturnBillSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  products: [productSchema],
  totalAmount: {
    type: Number,
    required: true,
  },
});

const ReturnBill = mongoose.model("ReturnBill", ReturnBillSchema);

export default ReturnBill;
