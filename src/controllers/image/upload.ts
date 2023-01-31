import { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";
import Chat, { validateChat, validateReceiverId } from "../../models/chat";
import User from "../../models/user";
import message from "../../views/message";
import _ from "lodash";

const imageStorage = multer.diskStorage({
	// Destination to store image
	destination: "static",
	filename: (req: any, file: any, cb) => {
		const fileName =
			file.fieldname +
			"_" +
			Date.now() +
			path.extname(file.originalname + ".jpg");
		req.query.fileName = fileName;
		cb(null, fileName);
	},
});

const upload = multer({
	storage: imageStorage,
	limits: {
		fileSize: 1000000, // 1000000 Bytes = 1 MB
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(png|jpg)$/)) {
			// upload only png and jpg format
			return cb(new Error("Please upload a Image"));
		}
		cb(null, true);
	},
});

async function uploadImage(req: Request, res: Response) {
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

	const newChat = new Chat({
		senderId: req?.query?._id,
		receiverId: req.params.receiverId,
		content: req.query.fileName,
		contentType: "image",
	});

	const chat = await newChat.save();
	res.send(
		message({
			statusCode: 200,
			message: "Chat Image has successfully sent",
			data: {
				..._.pick(
					chat,
					"senderId",
					"receiverId",
					"content",
					"contentType",
					"isDeleteMe",
					"_id"
				),
				baseUrl: process.env.baseUrlImage!,
			},
		})
	);
}

export default upload;
export { uploadImage };
