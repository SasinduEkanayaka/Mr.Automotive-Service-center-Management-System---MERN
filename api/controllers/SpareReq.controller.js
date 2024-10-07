import SpareReqModel from "../model/SpareReq.model.js";

export const createSpareReq = async (req, res) => {
  try {
    const spareReq = new SpareReqModel(req.body);
    await spareReq.save();
    res.status(201).json({ message: "Spare Part Requested Successfully" });
  } catch (error) {}
};
