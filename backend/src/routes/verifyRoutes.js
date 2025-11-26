import express from "express";
import { verifyEquipment } from "../controllers/verifyController.js";

const router = express.Router();    
router.post("/", verifyEquipment);

export default router;