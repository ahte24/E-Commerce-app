"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const UpdateProduct = ({ params }) => {
	const [productData, setProductData] = useState({ name: "", description: "" });
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleChange = (event) => {
		setProductData({ ...productData, [event.target.name]: event.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(`http://localhost:5000/${params.id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(productData),
			});

			if (!response.ok) {
				throw new Error("Product update failed");
			}

			console.log(response);
			const updatedProduct = await response.json();
			// Handle successful update (e.g., display confirmation message)
			console.log("Product updated:", updatedProduct);
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="name">Name:</label>
			<input
				type="text"
				id="name"
				name="name"
				value={productData.name}
				onChange={handleChange}
			/>
			<br />
			<label htmlFor="description">Description:</label>
			<textarea
				id="description"
				name="description"
				value={productData.description}
				onChange={handleChange}
			/>
			<br />
			<button type="submit" disabled={isLoading}>
				{isLoading ? "Updating..." : "Update Product"}
			</button>
			{error && <p className="error">{error}</p>}
		</form>
	);
};

export default UpdateProduct;
