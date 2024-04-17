"use client";
import React, { useState, useEffect } from "react";

const UpdateProduct = ({ params }) => {
	const [productData, setProductData] = useState({ name: "", description: "" });
	const [error, setError] = useState(null);

	// Fetch product data from the database
	useEffect(() => {
		const fetchProduct = async () => {
			setError(null);

			try {
				const response = await fetch(
					`http://localhost:5000/product/info/${params.id}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				if (response.ok) {
					const data = await response.json();
					setProductData(data); // Set product data received from API
				} else {
					window.location.href = "/products";
					console.error("Error fetching product:", response.statusText);
					setError("Error fetching product");
				}
			} catch (error) {
				console.error("Error fetching product:", error);
				setError("Error fetching product");
			}
		};

		fetchProduct();
	}, [params.id]);

	const handleChange = (event) => {
		setProductData({ ...productData, [event.target.name]: event.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(`http://localhost:5000/${params.id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(productData),
			});

			if (!response.ok) {
				throw new Error("Product update failed");
			}
			const updatedProduct = await response.json();
			// Handle successful update (e.g., display confirmation message)
			console.log("Product updated:", updatedProduct);
			window.location.href = "/products";
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="bg-gray-100 h-screen flex items-center justify-center">
			<div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
				<h2 className="text-2xl font-semibold mb-4">Update Information</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="name"
							className="block text-gray-700 font-bold mb-2"
						>
							Name
						</label>
						<input
							value={productData.name} // Display product name
							onChange={handleChange}
							type="text"
							id="name"
							name="name"
							className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:border-blue-500"
							placeholder="Enter your name"
						/>
					</div>
					<div className="mb-6">
						<label
							htmlFor="description"
							className="block text-gray-700 font-bold mb-2"
						>
							Description
						</label>
						<textarea
							value={productData.description} // Display product description
							onChange={handleChange}
							id="description"
							name="description"
							rows="3"
							className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:border-blue-500"
							placeholder="Enter description"
						></textarea>
					</div>
					<div className="flex justify-end">
						<button
							type="submit"
							className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
						>
							Update
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateProduct;
