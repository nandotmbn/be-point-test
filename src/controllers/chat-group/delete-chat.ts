import { NextFunction, Request, Response } from "express";
import Chat, { validateChat, validateReceiverId } from "../../models/chat";
import message from "../../views/message";
import User from "../../models/user";
import ChatGroup, { validateChatGroup, validateGroupId } from "../../models/chat-group";
import Group from "../../models/groups";

async function deleteChatGroup(req: Request, res: Response, next: NextFunction) {
	const validateGroupIdRes = validateGroupId({
		groupId: req.params.groupId,
	});

	if (validateGroupIdRes.error)
		return res.status(400).send(
			message({
				statusCode: 400,
				data: validateGroupIdRes.error.message,
				message: "Bad Request",
			})
		);

	const isSenderExist = await User.findById(req.query._id);
	if (!isSenderExist) {
		return res.status(404).send(
			message({
				statusCode: 404,
				message: "Sender is not found",
				data: req.body,
			})
		);
	}

	const isReceiver = await Group.findById(req.params.groupId);
	if (!isReceiver) {
		return res.status(404).send(
			message({
				statusCode: 404,
				message: "Group is not found",
				data: req.body,
			})
		);
	}

	const isChatExist = await ChatGroup.findById(req.params.chatId);
	if (!isChatExist) {
		return res.status(404).send(
			message({
				statusCode: 404,
				message: "Chat is not found",
				data: req.body,
			})
		);
	}

	const selfDeletedChat = await ChatGroup.findByIdAndRemove(req.params.chatId);

	res.send(
		message({
			statusCode: 200,
			message: "Chat has successfully deleted",
			data: selfDeletedChat,
		})
	);
}

export default deleteChatGroup;
