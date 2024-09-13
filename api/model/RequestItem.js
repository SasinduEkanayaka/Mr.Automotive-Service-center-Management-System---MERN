import mongoose from "mongoose";

const requestItemSchema = new mongoose.Schema(
  {
    requestID: {
      type: String,
      required: true,
      unique: true,
    },
    supplierName: {
      type: String,
      required: true,
    },
    requestDate: {
      type: Date,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true } // Enable createdAt and updatedAt fields
);

export const RequestItem = mongoose.model("RequestItem", requestItemSchema);
