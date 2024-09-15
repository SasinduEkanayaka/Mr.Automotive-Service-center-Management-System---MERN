import express from "express";
import {
  createModificationPkg,
  getAllModificationPkg,
  getModificationPkg,
  deleteModificationPkg,
  updateModificationPkg,
} from "../controllers/ModificationPkg.controller.js";

const router = express.Router();

router.post("/add", createModificationPkg);
router.get("/get", getAllModificationPkg);
router.get("/get/:id", getModificationPkg);
router.delete("/del/:id", deleteModificationPkg);
router.put("/update/:id", updateModificationPkg);

export default router;
