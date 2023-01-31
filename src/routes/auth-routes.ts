import express from "express";
import registerDevice from "../controllers/auth/register-device";
import loginDevice from "../controllers/auth/login-device";
const router = express.Router();

router.post("/auth/register", [registerDevice]);

router.post("/auth/login", [loginDevice]);

export default router;
