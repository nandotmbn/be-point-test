import express from "express";
import CreateGroup from "../controllers/groups/create-group";
import headerAccessToken from "../controllers/headers/header-token";
const router = express.Router();

router.post("/group/register", [headerAccessToken, CreateGroup]);

export default router;
