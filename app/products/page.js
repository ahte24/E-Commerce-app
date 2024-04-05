"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const ProductList = () => {
	const [products, setProducts] = useState([]);

	const handleClick = (product) => {
		console.log(product._id);
	};

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const authToken = localStorage.getItem("token");
				const response = await fetch("http://localhost:5000/products/seller", {
					method: "GET",
					headers: {
						Authorization: `Bearer ${authToken}`,
						"Content-Type": "application/json", // Add the Content-Type header
						// Other headers if required
					},
				});
				if (response.ok) {
					const data = await response.json();
					setProducts(data);
				} else {
					console.error("Error fetching products:", response.statusText);
				}
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};
		fetchProducts();
	}, []);
	return (
		<div>
			<h1>Product List</h1>
			<ul>
				{products.map((product) => (
					<Link key={uuidv4()} href={`productinfo/${product._id}`}>
						<li
							key={uuidv4()}
							onClick={() => {
								handleClick(product);
							}}
						>
							{product.name}(ID: {product._id})
						</li>
					</Link>
				))}
			</ul>
		</div>
	);
};

export default ProductList;
