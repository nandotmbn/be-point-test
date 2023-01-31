import express, { Express, Request, Response } from "express";
import { Server, Socket } from "socket.io";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

export default function (app: Express, io: Server) {
	mongoose.set("strictQuery", false);
	mongoose
		.connect(
			"mongodb+srv://orlandosykes:orlandosykes@technorcluster.0ayow.mongodb.net/Boilerplate?retryWrites=true&w=majority"
		)
		.then(() => console.log("Connected to MongoDB"))
		.catch((e) => {
			throw new Error("Error : " + e);
		});
	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept, token"
		);
		next();
	});

	app.use("/static", express.static("static"));
	app.use(bodyParser.json());
	app.use(express.urlencoded({ extended: true }));
	app.set("trust proxy", true);
	app.use(
		cors({
			exposedHeaders: "x-auth-token",
		})
	);
	app.set("socketIo", io);
}
