import express from "express";
import mongoose from "mongoose";
import { User } from "./model/User.js"; // Assuming User model is defined here
import bodyParser from "body-parser"; // Use bodyParser.json() instead
import cors from "cors";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken"; // Use jwt instead of Jwt (common practice)
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.json());
const connect = await mongoose.connect(process.env.MONGO_URI);

const jwtSecret = "M_A_Zaman";

function decodeToken(req, res, next) {
	const bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== "undefined") {
		const bearerToken = bearerHeader.split(" ")[1];
		req.token = bearerToken;
		const decodedToken = jwt.verify(bearerToken, jwtSecret);
		// console.log(decodedToken.user);
		next();
	} else {
		// Handle missing token case
		res.status(401).json({ message: "Authorization token required" });
	}
}

function verifyToken(req, res, next) {
	const bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== "undefined") {
		const bearerToken = bearerHeader.split(" ")[1];
		req.token = bearerToken;
		jwt.verify(bearerToken, jwtSecret, (err, authData) => {
			if (err) {
				console.error(err);
				return res.status(403).json({ message: "Invalid token" });
			}
			req.user = authData.user;
			next();
		});
	} else {
		// Handle missing token case
		res.status(401).json({ message: "Authorization token required" });
	}
}

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
		jwt.sign(
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

app.post("/updateData", verifyToken, decodeToken, async (req, res) => {
	try {
		const userId = req.user;
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{
				$set: {
					name: req.body.name,
					address: req.body.address,
					cardDetails: req.body.cardDetails,
				},
			},
			{ new: true }
		);

		if (!updatedUser) {
			return res.status(404).json({ error: "User not found" });
		}

		res.json(updatedUser); // Send back the updated user data
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Error storing data" });
	}
});

app.get("/pro", verifyToken, decodeToken, (req, res) => {
	res.json({ message: "This is protected route." });
});

app.listen(port, () => {
	console.log(`My app listening on port ${port}`);
});
