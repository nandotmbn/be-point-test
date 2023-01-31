import Joi from "joi";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	fullName: {
		type: String,
		minlength: 0,
		maxlength: 64,
		trim: true,
	},
	phoneNumber: {
		type: String,
	},
});

const User = mongoose.model("User", UserSchema);

function validateUser(User: any) {
	const schema = Joi.object({
		fullName: Joi.string().min(3).max(64).required(),
		phoneNumber: Joi.string().min(10).max(64).required(),
	});
	return schema.validate(User);
}

export default User;
export { validateUser };
