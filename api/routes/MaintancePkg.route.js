import express from "express";
import {
  createMaintancePkg,
  getAllMaintancePkg,
  getMaintancePkg,
} from "../controllers/MaintancePkg.controller.js";

const router = express.Router();

router.post("/add", createMaintancePkg);
router.get("/get", getAllMaintancePkg);
router.get("/get/:id", getMaintancePkg);

export default router;
