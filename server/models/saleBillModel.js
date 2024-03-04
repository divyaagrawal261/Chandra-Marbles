import mongoose from "mongoose";

const SaleBillSchema = new mongoose.Schema({
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

const SaleBill = mongoose.model("SaleBill", SaleBillSchema);

export default SaleBill;
