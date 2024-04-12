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
import { Cart } from "./model/cart.js";
dotenv.config();

const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.json());

await mongoose.connect(process.env.MONGO_URI);

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
			{ expiresIn: "24h" },
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

// This is verified route
app.get("/pro", verifyToken, (req, res) => {
	res.json({ message: "This is protected route." });
});

app.post("/addData", verifyToken, async (req, res) => {
	try {
		const userId = req.user;
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{
				$set: {
					name: req.body.name,
					address: req.body.address,
					cardDetails: req.body.cardDetails,
					mobileNumber: req.body.mobileNumber,
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

// Listing products
app.post("/listproducts", verifyToken, isSeller, async (req, res) => {
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
});

// Fetch current user data from the user collection of the database (GET)
app.get("/getuserdata", verifyToken, async (req, res) => {
	const userId = req.user;
	try {
		const userData = await User.findById(userId);
		if (userData) {
			res.json(userData); // Send user data as JSON response
		} else {
			res.status(404).send("No user found with that ID");
		}
	} catch (err) {
		console.error("Error fetching user:", err);
		res.status(500).send("Internal Server Error");
	}
});

// update user data
app.put("/userdata/update", verifyToken, async (req, res) => {
	const userId = req.user;
	const update = req.body;

	try {
		const updateUserData = await User.findByIdAndUpdate(userId, update, {
			new: true,
		});
		if (!updateUserData) {
			return res.status(404).json({ message: "User not found" }); // Respond with 404 Not Found if product not found
		}
		return res
			.status(200)
			.json({ message: "User data updated successfully: ", updateUserData });
	} catch (error) {
		res.status(500).json({ error: "Server error" }); // Respond with 500 Internal Server Error on unexpected errors
	}
});

// Fetch all the product Data of the current seller from the product collection of the database (GET)
app.get("/products/seller", verifyToken, isSeller, async (req, res) => {
	const sellerId = req.user;
	try {
		Product.find({ sellerId: sellerId }).then((products) => {
			if (products.length > 0) {
				res.json(products);
			} else {
				res.json({ message: "No products found with that seller ID" });
			}
		});
	} catch (err) {
		console.error("Error fetching products:", err);
	}
});

// To view a specific data
// Fetch single data of the product associated with the ID from the product collection of the database (GET)
app.get("/product/info/:id", verifyToken, isSeller, async (req, res) => {
	const { id } = req.params;

	try {
		const productData = await Product.findOne({ _id: id });
		if (productData) {
			res.json(productData);
		} else {
			res.status(404).send("No product found with that ID");
		}
	} catch (error) {
		console.error("Error fetching product data: ", error);
		res.status(500).send("Internal Server Error");
	}
});

// Update a product by ID (PUT)
app.put("/:id", verifyToken, isSeller, async (req, res) => {
	// Route handler for PUT requests to "/:id" endpoint (where ":id" is a dynamic parameter)

	const { id } = req.params; // Extract product ID from request parameters
	const updates = req.body; // Capture update data from request body

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
			new: true, // Return the updated product document
		});

		if (!updatedProduct) {
			return res.status(404).json({ message: "Product not found" }); // Respond with 404 Not Found if product not found
		}

		res.status(200).json(updatedProduct); // Respond with 200 OK and the updated product data
	} catch (error) {
		res.status(500).json({ error: "Server error" }); // Respond with 500 Internal Server Error on unexpected errors
	}
});

// Fetch all the product from the product collection of the database (GET)
app.get("/products/all", async (req, res) => {
	// Route handler for GET requests to "/products/all" endpoint

	try {
		const products = await Product.find({}); // Find all products asynchronously

		if (products.length > 0) {
			res.status(200).json(products); // Respond with the list of products (status code 200: OK)
		} else {
			res.status(204).send("No products found."); // Respond with an empty response (status code 204: No Content)
		}
	} catch (error) {
		console.error(error); // Log the error for debugging
		res.status(500).json({ message: "Error fetching products" }); // Respond with a user-friendly error message (status code 500: Internal Server Error)
	}
});

app.post("/cart/:productId", verifyToken, (req, res) => {
	const userId = req.user;
	const { productId } = req.params;

	try {
		const cartData = new Cart({
			userId: userId,
			productId: productId,
			quantity: req.body.quantity,
		});
		const save = cartData.save();
		if (save) {
			res.json({ message: "Item added to cart." });
		} else {
			res.json({ message: "Something went wrong" });
		}
	} catch (error) {
		res.send({ message: "Internal server error." });
	}
});

app.get("/cart", verifyToken, async (req, res) => {
	try {
		const userId = req.user;
		const cart = await Cart.find({ userId: userId });
		// Check if the cart is empty
		if (cart.length === 0) {
			return res.json({ message: "Your cart is currently empty." });
		}
		// Array to store product data
		const productsData = [];
		for (const cartItem of cart) {
			const product = await Product.findById(cartItem.productId);
			if (!product) {
				// Handle missing product gracefully
				res.json({
					message: `Product with ID ${cartItem.productId} not found.`,
				});
				continue; // Skip to the next item
			}
			productsData.push({
				product: product,
				quantity: cartItem.quantity,
			});
		}

		// Send the response after looping through all items
		res.json({ Cart: productsData });
	} catch (error) {
		console.error(error); // Log the error for debugging
		res
			.status(500)
			.json({ message: "An error occurred while retrieving your cart." });
	}
});

app.listen(port, () => {
	console.log(`My app listening on port ${port}`);
});
