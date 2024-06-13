import express from "express";
import { register, login } from "../controllers/authController";
import { authenticateJWT } from "../middlewares/authMiddleware";

 const router = express.Router();
 router.post('/login',login);
 router.post('/signup',register)
 

 export default router