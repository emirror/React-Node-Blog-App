import express from "express";
import AuthController from "../controllers/auth.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/user", auth, AuthController.user);
router.get("/logout", AuthController.logout);

export default router;
