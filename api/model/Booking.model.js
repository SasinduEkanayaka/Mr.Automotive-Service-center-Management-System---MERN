import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    package: {
      pkgName: {
        type: String,
      },
      pkgId: {
        type: String,
      },
      description: {
        type: String,
      },
      price: {
        type: Number,
      },
    },
    cusName: {
      type: String,
      reqired: true,
    },
    cusEmail: {
      type: String,
      reqired: true,
    },
    cusMobile: {
      type: String,
      reqired: true,
    },
    vehNum: {
      type: String,
      reqired: true,
    },
    milage: {
      type: Number,
      reqired: true,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BookingModel", bookingSchema);
