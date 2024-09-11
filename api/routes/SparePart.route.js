import express from "express";
import { createSparePart } from "../controllers/SparePart.controller.js";

const router = express.Router();

router.post("/add", createSparePart);

export default router;
