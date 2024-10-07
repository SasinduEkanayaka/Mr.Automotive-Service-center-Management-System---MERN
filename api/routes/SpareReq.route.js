import express from "express";
import { createSpareReq } from "../controllers/SpareReq.controller.js";

const router = express.Router();

router.post("/add", createSpareReq);

export default router;
