import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	sellerId: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
		minlength: 3,
	},
	description: {
		type: String,
		required: true,
		minlength: 2,
	},
	price: {
		type: Number,
		min: 0,
		required: true,
	},
	// countInStock: {
	// 	type: Number,
	// 	required: true,
	// 	min: 0,
	// },
	// imageURL: {
	// 	type: String,
	// 	required: true,
	// 	minlength: 2,
	// },
	// ratings: {
	// 	type: Number,
	// 	required: true,
	// 	min: 0,
	// },
	// reviews: {
	// 	type: Number,
	// 	min: 0,
	// },
	// kind: {
	// 	type: String,
	// 	required: true,
	// 	minlength: 3,
	// },
	// itemType: {
	// 	type: String,
	// 	required: true,
	// 	minlength: 2,
	// },
	// discount: {
	// 	type: Number,
	// 	min: 0,
	// },
});

export const Product = mongoose.model("Product", productSchema);
