import express, { Request, Response } from "express";
import deleteChatGroup from "../controllers/chat-group/delete-chat";
import deleteSelfChatGroup from "../controllers/chat-group/delete-self-chat";
import getChatGroup from "../controllers/chat-group/get-chat";
import postChatGroup from "../controllers/chat-group/post-chat";
import headerAccessToken from "../controllers/headers/header-token";
import upload, { uploadImageChatGroup } from "../controllers/image/upload";
const router = express.Router();

router.get("/chat-group/:groupId", [headerAccessToken, getChatGroup]);
router.post("/chat-group/:groupId", [headerAccessToken, postChatGroup]);
router.delete("/chat-group/:groupId/:chatId/", [headerAccessToken, deleteChatGroup]);
router.delete("/chat-group/:groupId/:chatId/self", [
	headerAccessToken,
	deleteSelfChatGroup,
]);
router.post("/chat-group-image/:groupId", [headerAccessToken, upload.single("image"), uploadImageChatGroup]);

export default router;
