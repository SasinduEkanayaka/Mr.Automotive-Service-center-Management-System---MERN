import express from "express";
import {
  createModificationPkg,
  getAllModificationPkg,
  getModificationPkg,
  deleteModificationPkg,
  updateModificationPkg,
  updateStatus,
} from "../controllers/ModificationPkg.controller.js";

const router = express.Router();

router.post("/addMod", createModificationPkg);
router.get("/getMod", getAllModificationPkg);
router.get("/getMod/:id", getModificationPkg);
router.delete("/delMod/:id", deleteModificationPkg);
router.put("/updateMod/:id", updateModificationPkg);
router.put("/status/:id", updateStatus);

export default router;
