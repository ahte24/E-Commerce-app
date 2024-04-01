import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
	name: {
		firstName: String,
		middleName: String,
		lastName: String,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	address: {
		street: String,
		city: String,
		state: String,
		postalCode: String,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	cardDetails: {
		type: String, // Card type (e.g., credit card, debit card)
		number: String, // Masked or encrypted card number (security best practice)
		expiry: String, // MM/YYYY format
	},
});

export const User = mongoose.model("User", UserSchema);
