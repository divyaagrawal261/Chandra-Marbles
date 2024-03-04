import mongoose from "mongoose";

const ReturnBillSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
});

const ReturnBill = mongoose.model("ReturnBill", ReturnBillSchema);

export default ReturnBill;
