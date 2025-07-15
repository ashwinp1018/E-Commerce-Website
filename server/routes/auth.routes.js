import express from "express";
import { register,login } from "../controllers/auth.controller";

const router = express.Router();


router.post('/resgister',register);
router.post('/logim',login);

export default router;