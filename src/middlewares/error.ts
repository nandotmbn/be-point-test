import { NextFunction, Request, Response } from "express";
import message from "../views/message";
import AppLogger from "./logger-error";

export default function (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	AppLogger.error(err.message);
	res.status(500).send(
		message({
			statusCode: 500,
			message: "Internal Server Error",
			data: err.message,
		})
	);
}
