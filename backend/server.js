import express from "express";
import mongoose from "mongoose";
import { User } from "./model/User.js"; // Assuming User model is defined here
import { Product } from "./model/product.js";
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

const jwtSecret = process.env.JWT_KEY;

const decodeToken = (req, res, next) => {
	const bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== "undefined") {
		const bearerToken = bearerHeader.split(" ")[1];
		req.token = bearerToken;
		const decodedToken = jwt.verify(bearerToken, jwtSecret);
		next();
	} else {
		// Handle missing token case
		res.status(401).json({ message: "Authorization token required" });
	}
};

const verifyToken = (req, res, next) => {
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
};

// check if the user is seller or not

const isSeller = (req, res, next) => {
	const bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== "undefined") {
		const bearerToken = bearerHeader.split(" ")[1];
		req.token = bearerToken;
		jwt.verify(bearerToken, jwtSecret, (err, authData) => {
			if (err) {
				console.error(err);
				// Handle token verification error
				res.status(401).json({ message: "Authorization failed" });
			} else {
				// Assuming authData contains user information
				const isUserSeller = authData.isSeller;
				if (isUserSeller) {
					// User is a seller, proceed to the next middleware
					next();
				} else {
					// User is not a seller, return unauthorized status
					res
						.status(403)
						.json({ message: "Access Denied: Seller permissions required" });
				}
			}
		});
	} else {
		// Handle missing token case
		res.status(401).json({
			message:
				"You are not authorized to access this resource. Please provide a valid authorization token.",
		});
	}
};

app.post("/signup", async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const user = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
			isSeller: req.body.isSeller,
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
			{ user: user._id, isSeller: user.isSeller },
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
					isSeller: req.body.isSeller,
				},
			},
			{ new: true }
		);

		if (!updatedUser) {
			return res.status(404).json({ error: "User not found" });
		}

		res.json(updatedUser);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Error storing data" });
	}
});

app.post(
	"/listproducts",
	verifyToken,
	decodeToken,
	isSeller,
	async (req, res) => {
		try {
			const sellerId = req.user;
			const newProduct = new Product({
				sellerId: sellerId,
				name: req.body.name,
				description: req.body.description,
				price: req.body.price,
				countInStock: req.body.countInStock,
				imageURL: req.body.imageURL,
				ratings: req.body.ratings,
				reviews: req.body.reviews,
				kind: req.body.kind,
				itemType: req.body.itemType,
				discount: req.body.discount,
			});
			const savedProduct = await newProduct.save();
			res.status(201).send(savedProduct); // Or send a success message
		} catch (err) {
			console.error(err);
			res.status(500).send("Internal Server Error");
		}
	}
);

app.get("/pro", verifyToken, decodeToken, (req, res) => {
	res.json({ message: "This is protected route." });
});

app.listen(port, () => {
	console.log(`My app listening on port ${port}`);
});
