import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stock",
  },
  barcode:{type:String},
  orderedQuantity: Number, 
});

const SaleBillSchema = new mongoose.Schema({
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

const SaleBill = mongoose.model("SaleBill", SaleBillSchema);

export default SaleBill;
