import express from "express";
import {
  createBooking,
  getAllBookings,
  deleteBooking,
  updateBooking,
} from "../controllers/Booking.controller.js";

const router = express.Router();

router.post("/add", createBooking);
router.get("/get", getAllBookings);
router.delete("/delete/:id", deleteBooking);
router.put("/update/:id", updateBooking);

export default router;
