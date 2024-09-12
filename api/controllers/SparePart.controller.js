import SparePart from "../model/SparePart.model.js";

export const createSparePart = async (req, res) => {
  try {
    const {
      partName,
      supplier,
      price,
      quantity,
      category,
      type,
      description,
      features,
      imageUrl,
    } = req.body;

    const sparePart = new SparePart({
      partName,
      supplier,
      price,
      quantity,
      category,
      type,
      description,
      features,
      imageUrl,
    });

    await sparePart.save();

    res
      .status(201)
      .json({ message: "Spare part added successfully", sparePart });
  } catch (error) {
    res.status(500).json({ message: "Error adding spare part", error });
  }
};
