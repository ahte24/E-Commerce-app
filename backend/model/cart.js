import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
	userId: {
		type: String,
		require: true,
	},
	productId: {
		type: String,
		require: true,
		unique: true,
	},
	quantity: {
		type: Number,
		default: 1,
	},
});

export const Cart = mongoose.model("Cart", cartSchema);
