import express from 'express';
import mongoose from 'mongoose';
import { Payment } from '../model/Payment.js';

const router = express.Router();

// Route for new payment
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.cusID ||
      !request.body.Vehicle_Number ||
      !request.body.PaymentDate ||
      !request.body.PaymentMethod ||
      !request.body.Booking_Id ||
      !request.body.Pamount ||
      !request.body.email
    ) {
      return response.status(400).send({
        message: 'Send all required fields: cusID, Vehicle_Number, PaymentDate, PaymentMethod, Booking_Id, Pamount, email',
      });
    }

    const newPayment = new Payment({
      cusID: request.body.cusID,
      Vehicle_Number: request.body.Vehicle_Number,
      PaymentDate: request.body.PaymentDate,
      PaymentMethod: request.body.PaymentMethod,
      Booking_Id: request.body.Booking_Id,
      Pamount: request.body.Pamount,
      email: request.body.email,
      Package: request.body.Package || null, // Set to null if not provided
    });

    const payment = await newPayment.save();
    return response.status(201).send(payment);
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

// GET route for retrieving payments based on search criteria, pagination, and sorting
router.get("/payments", async (req, res) => {
  try {
    const { page = 1, limit = 5, search = "", sort = "PaymentId" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const query = {
      $or: [
        { PaymentId: { $regex: new RegExp(search, 'i') } },
        { PaymentDate: { $regex: new RegExp(search, 'i') } },
        { Vehicle_Number: { $regex: new RegExp(search, 'i') } },
        { PaymentMethod: { $regex: new RegExp(search, 'i') } },
      ],
    };

    const payments = await Payment.find(query)
      .sort({ [sort]: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({ count: payments.length, data: payments });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// Route for all the payments
router.get('/', async (request, response) => {
  try {
    const payments = await Payment.find({});
    return response.status(200).json({
      count: payments.length,
      data: payments
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for retrieving a specific Payment by ID or cusID
router.get('/:identifier', async (request, response) => {
  try {
    const { identifier } = request.params;

    if (mongoose.Types.ObjectId.isValid(identifier)) {
      const PaymentByID = await Payment.findById(identifier);
      if (PaymentByID) {
        return response.status(200).json(PaymentByID);
      }
    }

    const PaymentByCUSID = await Payment.find({ cusID: identifier });
    if (PaymentByCUSID.length) {
      return response.status(200).json(PaymentByCUSID);
    }

    return response.status(404).json({ message: 'Payment not found' });
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: 'Error fetching payment: ' + error.message });
  }
});

// Route for updating a payment
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.cusID ||
      !request.body.Vehicle_Number ||
      !request.body.PaymentDate ||
      !request.body.PaymentMethod ||
      !request.body.Booking_Id
    ) {
      return response.status(400).send({
        message: 'Send all required fields: PaymentId, cusID, PaymentDate, PaymentMethod',
      });
    }

    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).send({ message: 'Invalid Payment ID' });
    }

    const result = await Payment.findByIdAndUpdate(id, request.body, { new: true });
    if (!result) {
      return response.status(404).json({ message: 'Payment not found' });
    }
    return response.status(200).send(result);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for deleting a payment
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).send({ message: 'Invalid Payment ID' });
    }

    const result = await Payment.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: 'Payment not found' });
    }
    return response.status(200).send({ message: "Payment deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
