import Joi from "joi";
import mongoose from "mongoose";
import { joiObjectId } from "ts-joi-objectid";

const MyJoi = joiObjectId(Joi);

const ChatGroupSchema = new mongoose.Schema({
	groupId: {
		type: mongoose.Schema.Types.ObjectId,
		minlength: 0,
		maxlength: 64,
		trim: true,
	},
	senderId: {
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

const ChatGroup = mongoose.model("ChatGroup", ChatGroupSchema);

function validateChatGroup(chat: any) {
	const schema = Joi.object({
		content: Joi.string().min(1).max(500).required(),
	});
	return schema.validate(chat);
}

function validateGroupId(id: any) {
	const schema = Joi.object({
		groupId: MyJoi().required(),
	});
	return schema.validate(id);
}

export default ChatGroup;
export { validateChatGroup, validateGroupId };
