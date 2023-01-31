import { NextFunction, Request, Response } from "express";
import LANGUAGE from "../../static/language.json";
import message from "../../views/message";

export default function headerLanguange(
	req: Request,
	res: Response,
	next: NextFunction
) {
	let isIncluded: boolean = false;
	if (!req.headers["accept-language"])
		return res.status(400).send(
			message({
				statusCode: 400,
				message: "Accept Language does not exist",
				data: {
					message: "You have to use listed language",
					listedLanguage: LANGUAGE,
				},
			})
		);
	LANGUAGE.forEach((lang) => {
		if (req.headers["accept-language"] == lang) isIncluded = true;
	});
	if (!isIncluded)
		return res.status(400).send(
			message({
				statusCode: 400,
				message: "Accept Language Not Included",
				data: {
					message: "You have to use listed language",
					listedLanguage: LANGUAGE,
				},
			})
		);
  next();
}
