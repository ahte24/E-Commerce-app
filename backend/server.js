import express from "express";
import mongoose from "mongoose";
import { User } from "./model/User.js";
import bodyparser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 5000;
app.use(cors());
app.use(bodyparser.json());
const connect = await mongoose.connect(process.env.MONGO_URI);

const jwtSecret = process.env.JWT_KEY;

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
	if (user && (await bcrypt.compare(req.body.password, user.password))) {
		Jwt.sign(
			{ user: user._id },
			jwtSecret,
			{ expiresIn: "1h" },
			(err, token) => {
				if (err) {
					return res.status(403).send("Error signing token");
				}
				res.json({ token });
			}
		);
	} else {
		res.send("user doesnot exist please signup first to access your account");
	}
});

// Middleware to verify the token
function verifyToken(req, res, next) {
	const bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== "undefined") {
		const bearerToken = bearerHeader;
		req.token = bearerToken;
		console.log(req.token);
		Jwt.verify(bearerToken, jwtSecret, (err, authData) => {
			if (err) {
				console.log(err);
				console.log("Error verifying token");
				return res.sendStatus(403);
			} else {
				req.user = authData.user;
				next();
			}
		});
	} else {
		res.sendStatus(403); // Restrict home page for unverified user
	}
}

app.post("/protected", verifyToken, (req, res) => {
	res.json({ message: "This is protected route." });
});

app.listen(port, () => {
	console.log(`My app listening on port ${port}`);
});
