import { NextFunction, Request, Response } from "express";
import Chat, { validateChat, validateReceiverId } from "../../models/chat";
import message from "../../views/message";
import User from "../../models/user";

async function postChat(req: Request, res: Response, next: NextFunction) {
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

	const { error } = validateChat(req.body);
	if (error)
		return res.status(400).send(
			message({
				statusCode: 400,
				data: error.message,
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

	const newChat = new Chat({
		senderId: req?.query?._id,
		receiverId: req.params.receiverId,
		content: req.body.content,
	});

	const chat = await newChat.save();
	res.send(
		message({
			statusCode: 200,
			message: "Chat has successfully sent",
			data: chat,
		})
	);
}

export default postChat;
