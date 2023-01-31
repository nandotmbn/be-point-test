import { NextFunction, Request, Response } from "express";
import Chat, { validateChat, validateReceiverId } from "../../models/chat";
import message from "../../views/message";
import User from "../../models/user";

async function deleteSelfChat(req: Request, res: Response, next: NextFunction) {
	const validateReceiverIdRes = validateReceiverId({
		receiverId: req.params.receiverId,
	});

	if (validateReceiverIdRes.error)
		return res.status(400).send(
			message({
				statusCode: 400,
				data: validateReceiverIdRes.error.message,
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

	const isReceiver = await User.findById(req.params.receiverId);
	if (!isReceiver) {
		return res.status(404).send(
			message({
				statusCode: 404,
				message: "Receiver is not found",
				data: req.body,
			})
		);
	}

	const isChatExist = await Chat.findById(req.params.chatId);
	if (!isChatExist) {
		return res.status(404).send(
			message({
				statusCode: 404,
				message: "Chat is not found",
				data: req.body,
			})
		);
	}

	const selfDeletedChat = await Chat.findByIdAndUpdate(
		req.params.chatId,
		{
			$set: {
				isDeletedMe: true,
			},
		},
		{ new: true }
	);

	const result = await selfDeletedChat?.save();

	res.send(
		message({
			statusCode: 200,
			message: "Chat has successfully self deleted",
			data: result,
		})
	);
}

export default deleteSelfChat;
