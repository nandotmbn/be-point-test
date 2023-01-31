import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User, { validateUser } from "../../models/user";
import message from "../../views/message";
import Group, { validateGroup } from "../../models/groups";

async function CreateGroup(req: Request, res: Response, next: NextFunction) {
	const { error } = validateGroup(req.body);
	if (error)
		return res.status(400).send(
			message({
				statusCode: 400,
				data: error.message,
				message: "Bad Request",
			})
		);

	const isGroupExist = await Group.findOne({
		fullName: req.body.fullName,
	});
	if (isGroupExist) {
		return res.status(400).send(
			message({
				statusCode: 400,
				message: "Group has been registered",
				data: req.body,
			})
		);
	}

	const isUserExist = await User.findById(req.query._id);
	if (!isUserExist) {
		return res.status(404).send(
			message({
				statusCode: 404,
				message: "User is not found",
				data: req.body,
			})
		);
	}

	const newGroup = new Group({
		fullName: req.body.fullName,
		tsId: req.query._id,
	});

	const group = await newGroup.save();
	res.send(
		message({
			statusCode: 200,
			message: "Group successfully registered",
			data: group,
		})
	);
}

export default CreateGroup;
