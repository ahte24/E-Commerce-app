import express from "express";
import mongoose from "mongoose";
import { User } from "./model/User.js";
import bodyparser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
const port = 5000;
app.use(cors());
app.use(bodyparser.json());

const connect = await mongoose.connect("mongodb://localhost:27017/mydb");

app.get("/", (req, res) => {
	res.send("Hello world boy");
});

app.post("/signup", async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const user = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		});
		const result = await user.save();
		res.send("User registered");
	} catch (err) {
		res.send(err);
	}
});

app.post("/login", async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	}).exec();
	if (user) {
		const isValidPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);

		if (isValidPassword) {
			res.send("logged in succesfully");
			// console.log("logged in successfully")
		} else {
			res.send("Incorrect password");
		}
	} else {
		res.send("user doesnot exist please signup first to access your account");
	}
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
