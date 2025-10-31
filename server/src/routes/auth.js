import express from "express";
import AuthController from "../controllers/auth.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/logout", AuthController.logout);

export default router;
