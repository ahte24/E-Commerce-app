import express from "express";
import mongoose from "mongoose";
import { User } from "./model/User.js"; // Assuming User model is defined here
import { Product } from "./model/product.js";
import bodyParser from "body-parser"; // Use bodyParser.json() instead
import cors from "cors";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken"; // Use jwt instead of Jwt (common practice)
import { verifyToken, isSeller } from "./middleware.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.json());
const connect = await mongoose.connect(process.env.MONGO_URI);

const jwtSecret = process.env.JWT_KEY;

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

app.post("/updateData", verifyToken, async (req, res) => {
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

app.get("/userprofile", async (req, res) => {
	// write a get api to retreive all the data form the database
});

app.post(
	"/listproducts",
	verifyToken,

	isSeller,
	async (req, res) => {
		try {
			const sellerId = req.user;
			const newProduct = new Product({
				sellerId: sellerId,
				name: req.body.name,
				description: req.body.description,
				price: req.body.price,
				// countInStock: req.body.countInStock,
				// imageURL: req.body.imageURL,
				// ratings: req.body.ratings,
				// reviews: req.body.reviews,
				// kind: req.body.kind,
				// itemType: req.body.itemType,
				// discount: req.body.discount,
			});
			const savedProduct = await newProduct.save();
			res.status(201).send(savedProduct); // Or send a success message
		} catch (err) {
			console.error(err);
			res.status(500).send("Internal Server Error");
		}
	}
);

app.get("/pro", verifyToken, (req, res) => {
	res.json({ message: "This is protected route." });
});

app.get("/getdata", verifyToken, async (req, res) => {
	const userId = req.user;
	try {
		const userDoc = await User.findById(userId);
		if (userDoc) {
			res.json(userDoc); // Send user data as JSON response
		} else {
			res.status(404).send("No user found with that ID");
		}
	} catch (err) {
		console.error("Error fetching user:", err);
		res.status(500).send("Internal Server Error");
	}
});
app.get("/getproducts", verifyToken, async (req, res) => {
	const sellerId = req.user;
	try {
		Product.find({ sellerId: sellerId }).then((products) => {
			if (products.length > 0) {
				console.log("Products:", products);
				res.json(products);
			} else {
				console.log("No products found with that seller ID");
			}
		});
	} catch (err) {
		console.error("Error fetching products:", err);
	}
});

app.listen(port, () => {
	console.log(`My app listening on port ${port}`);
});
