import { NextFunction, Request, Response } from "express";
import message from "../../views/message";
import jwt, { JwtPayload } from "jsonwebtoken";

export default function headerAccessToken(
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (!req.headers["authorization"])
		return res.status(401).send(
			message({
				statusCode: 401,
				message: "Unauthorized",
				data: {
					message: "You have to login first",
				},
			})
		);
	const decode = jwt.verify(
		req.headers.authorization.split(" ")[1],
		process.env.jwtPrivateKey!
	) as string;

	req.query._id = JSON.parse(JSON.stringify(decode))._id;
	next();
}
