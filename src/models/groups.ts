import Joi from "joi";
import mongoose from "mongoose";
import { joiObjectId } from "ts-joi-objectid";

const MyJoi = joiObjectId(Joi);

const GroupSchema = new mongoose.Schema({
	fullName: {
		type: String,
		minlength: 0,
		maxlength: 64,
		trim: true,
	},
  tsId: {
		type: mongoose.Schema.Types.ObjectId,
		minlength: 0,
		maxlength: 64,
		trim: true,
	},
});

const Group = mongoose.model("Group", GroupSchema);

function validateGroup(Group: any) {
	const schema = Joi.object({
		fullName: Joi.string().min(3).max(64).required(),
	});
	return schema.validate(Group);
}

function validateTsId(id: any) {
	const schema = Joi.object({
		receiverId: MyJoi().required(),
	});
	return schema.validate(id);
}

export default Group;
export { validateGroup, validateTsId };
