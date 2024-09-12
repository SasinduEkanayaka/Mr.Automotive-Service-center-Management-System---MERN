import express from 'express';
import { Supplier } from '../model/Supplier.js';

const router = express.Router();

// Route for Save a new Supplier
router.post('/', async (req, res) => {
  try {
    const { SupplierName, ItemNo, ItemName, ContactNo, Email, Address } = req.body;
    
    if (!SupplierName  || !ItemName || !ContactNo || !Email || !Address) {
      return res.status(400).send({
        message: 'Send all required fields: SupplierName, ItemNo, ItemName, ContactNo, Email, Address',
      });
    }

    const newSupplier = {
      SupplierName,
      ItemNo,
      ItemName,
      ContactNo,
      Email,
      Address,
    };

    const supplier = await Supplier.create(newSupplier);
    return res.status(201).send(supplier);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Get All Suppliers from database
router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.find({});
    return res.status(200).json({
      count: suppliers.length,
      data: suppliers,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Get One Supplier from database by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findById(id);

    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    return res.status(200).json(supplier);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
// Route for Update a Supplier's status
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).send({ message: 'Status is required' });
    }

    const updatedSupplier = await Supplier.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedSupplier) {
      return res.status(404).send({ message: 'Supplier not found' });
    }

    res.status(200).send(updatedSupplier);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Delete a Supplier
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSupplier = await Supplier.findByIdAndDelete(id);

    if (!deletedSupplier) {
      return res.status(404).send({ message: 'Supplier not found' });
    }

    res.status(200).send({ message: 'Supplier deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});


// GET route for retrieving suppliers based on search criteria, pagination, and sorting
router.get("/searchSupplier", async (req, res) => {
  try {
    const { page = 1, limit = 7, search = "", sort = "SupplierID" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const validSortFields = ['SupplierID', 'SupplierName', 'ItemNo', 'ItemName', 'ContactNo', 'Email', 'Address', 'status'];
    
    if (!validSortFields.includes(sort)) {
      return res.status(400).json({ message: 'Invalid sort field' });
    }

    const query = {
      $or: [
        { SupplierID: { $regex: new RegExp(search, 'i') } },
        { SupplierName: { $regex: new RegExp(search, 'i') } },
        { ItemNo: { $regex: new RegExp(search, 'i') } },
        { ItemName: { $regex: new RegExp(search, 'i') } },
        { ContactNo: { $regex: new RegExp(search, 'i') } },
        { Email: { $regex: new RegExp(search, 'i') } },
        { Address: { $regex: new RegExp(search, 'i') } },
      ],
    };

    const suppliers = await Supplier.find(query)
      .sort({ [sort]: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({ count: suppliers.length, data: suppliers });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

export default router;
