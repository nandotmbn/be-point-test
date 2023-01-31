import express, { Request, Response } from "express";
import deleteChat from "../controllers/chats/delete-chat";
import deleteSelfChat from "../controllers/chats/delete-self-chat";
import getChat from "../controllers/chats/get-chat";
import postChat from "../controllers/chats/post-chat";
import headerAccessToken from "../controllers/headers/header-token";
import upload, { uploadImage } from "../controllers/image/upload";
// import uploadImage from "../controllers/image/upload";
const router = express.Router();

router.get("/chat/:receiverId", [headerAccessToken, getChat]);
router.post("/chat/:receiverId", [headerAccessToken, postChat]);
router.delete("/chat/:receiverId/:chatId/", [headerAccessToken, deleteChat]);
router.delete("/chat/:receiverId/:chatId/self", [
	headerAccessToken,
	deleteSelfChat,
]);
router.post("/image/:receiverId", [headerAccessToken, upload.single("image"), uploadImage]);

export default router;
