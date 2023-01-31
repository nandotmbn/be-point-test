import { time } from "console";
import { NextFunction, Request, Response } from "express";
import LoggerInfo from "./logger-info";

export default function (req: Request, res: Response, next: NextFunction) {
	LoggerInfo.log("info", `${req.method} ${req.path} from ${req.ip} at ${new Date().toLocaleString()}`);
	next();
}