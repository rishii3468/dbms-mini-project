import express from "express";
import { getCrops, createCrop, deleteCrop } from "../controllers/cropController.js";
import upload from "../middleware/upload.js"; 

const router = express.Router();

router.get("/", getCrops);

router.post("/create", upload.single("image"), createCrop);

router.delete("/:id", deleteCrop);

export default router;
