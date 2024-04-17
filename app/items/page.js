"use client";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";

const items = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			setError(null);

			try {
				const authToken = localStorage.getItem("token");
				const response = await fetch("http://localhost:5000/products/all", {
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
		<div className="bg-slate-100 p-4">
			{products.length > 0 && (
				<div className="flex border-solid min-h-[93vh] flex-wrap gap-7 p-2 container mx-auto">
					{products.map((product) => (
						<>
							<Link
								href={`items/${product._id}`}
								className="border-2 rounded-md flex flex-col gap-2 p-3 h-[350px] w-[230px]"
							>
								<div className="w-full rounded-md h-64 bg-slate-400"></div>
								<h1 className="font-bold overflow-hidden w-full h-5">
									{product.name}
								</h1>
								<div className="text-sm">{product.description}</div>
								<div className="font-semibold">
									<span>₹</span>
									{product.price}
								</div>
							</Link>
						</>
					))}
				</div>
			)}
		</div>
	);
};

export default items;
