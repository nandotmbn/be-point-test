import Joi from "joi";
import mongoose from "mongoose";
import { joiObjectId } from "ts-joi-objectid";

const MyJoi = joiObjectId(Joi);

const ChatSchema = new mongoose.Schema({
	senderId: {
		type: mongoose.Schema.Types.ObjectId,
		minlength: 0,
		maxlength: 64,
		trim: true,
	},
	receiverId: {
		type: mongoose.Schema.Types.ObjectId,
		minlength: 0,
		maxlength: 64,
		trim: true,
	},
	contentType: {
		type: String,
		enum: ["chat", "image"],
		default: "chat",
		required: true,
	},
	content: {
		type: String,
	},
	isDeletedMe: {
		type: Boolean,
		default: false,
	},
});

const Chat = mongoose.model("Chat", ChatSchema);

function validateChat(chat: any) {
	const schema = Joi.object({
		content: Joi.string().min(1).max(500).required(),
	});
	return schema.validate(chat);
}

function validateReceiverId(id: any) {
	const schema = Joi.object({
		receiverId: MyJoi().required(),
	});
	return schema.validate(id);
}

export default Chat;
export { validateChat, validateReceiverId };
