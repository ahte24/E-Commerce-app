"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

const ProductList = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(null);

	const handleClick = (product) => {
		console.log(product._id);
	};

	useEffect(() => {
		const fetchProducts = async () => {
			setError(null);

			try {
				const authToken = localStorage.getItem("token");
				const response = await fetch("http://localhost:5000/products/seller", {
					method: "GET",
					headers: {
						Authorization: `Bearer ${authToken}`,
						"Content-Type": "application/json",
					},
				});
				if (response.ok) {
					const data = await response.json();
					setProducts(data);
				} else {
					window.location.href = "/";
					console.error("Error fetching products:", response.statusText);
					setError("Error fetching products");
				}
			} catch (error) {
				console.error("Error fetching products:", error);
				setError("Error fetching products");
			}
		};

		fetchProducts();
	}, []);

	return (
		<div>
			<h1>Product List</h1>
			{error && <p className="error">{error}</p>}
			{products.length > 0 && (
				<ul>
					{products.map((product) => (
						<Link key={uuidv4()} href={`products/${product._id}`}>
							<li key={uuidv4()} onClick={() => handleClick(product)}>
								{product.name} (ID: {product._id})
							</li>
						</Link>
					))}
				</ul>
			)}
			{products.length === 0 && <p>No products found.</p>}
		</div>
	);
};

export default ProductList;
