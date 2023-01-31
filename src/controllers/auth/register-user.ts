import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User, { validateUser } from "../../models/user";
import message from "../../views/message";

export default async function (
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { error } = validateUser(req.body);
	if (error)
		return res.status(400).send(
			message({
				statusCode: 400,
				data: error.message,
				message: "Bad Request",
			})
		);

	const isUserExist = await User.findOne({
		fullName: req.body.fullName,
	});
	if (isUserExist) {
		return res.status(400).send(
			message({
				statusCode: 400,
				message: "User has been registered",
				data: req.body,
			})
		);
	}

	const newUser = new User({
		fullName: req.body.fullName,
		phoneNumber: req.body.phoneNumber,
	});

	const user = await newUser.save();
	res.send(
		message({
			statusCode: 200,
			message: "User successfully registered",
			data: user,
		})
	);
}
