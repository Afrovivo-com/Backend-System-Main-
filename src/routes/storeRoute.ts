import { Router } from "express";
import { authenticateJWT } from '../middlewares/authMiddleware';
import {createStoreController, deleteStoreController, getAllStoresController, getStoreByIDController, getStoresByOwnerIDController} from "../controllers/storeControllers";

const router = Router();

router.get("/", getAllStoresController);
router.get("/:id", getStoreByIDController);
router.get("/:ownerID", getStoresByOwnerIDController);
router.post("/", authenticateJWT, createStoreController);
router.delete("/:id", authenticateJWT, deleteStoreController);

export default router