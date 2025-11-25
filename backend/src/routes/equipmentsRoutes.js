import express from "express";
import { getAllEquipments, createEquipment, deleteEquipment, updateEquipment } from "../controllers/equipmentsController.js";

const router = express.Router();

router.get("/", getAllEquipments);

router.post("/create", createEquipment);

router.delete("/:id", deleteEquipment);

router.put("/:id", updateEquipment);


export default router;
