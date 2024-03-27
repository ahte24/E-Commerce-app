/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";

export default function Home() {
	const [data, setData] = useState(null);
	const [verified, setVerified] = useState(false); // State to track verification status

	useEffect(() => {
		async function fetchData() {
			try {
				let token = localStorage.getItem("token");
				if (!token) {
					window.location.href = "/login";
					setVerified(false);
					return;
				}

				// Ensure token is a string
				token = String(token);

				const response = await fetch("http://localhost:5000/pro", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`, // Fixed the capitalization of "Authorization"
					},
				});

				if (!response.ok) {
					console.error("Error fetching data:", response.statusText);
					if (response.status === 401) {
						setVerified(false);
					}
					return console.log("error occured");
				}

				const responseData = await response.json();
				setData(responseData);
				setVerified(true); // Set verified to true if successful
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}
		fetchData();
	}, []);

	return (
		<div>
			{verified ? (
				<div className="h-screen">
					<nav className="flex justify-between items-center py-[19px] bg-gray-800 text-white shadow-md px-4">
						<div className="flex items-center">
							<h1 className="text-2xl font-bold">Your Logo</h1>
						</div>
						<ul className="flex items-center space-x-6">
							<li>
								<a href="/" className="text-gray-300 hover:text-gray-100">
									Home
								</a>
							</li>
							<li>
								<a href="/about" className="text-gray-300 hover:text-gray-100">
									About
								</a>
							</li>
							<li>
								<a
									href="/services"
									className="text-gray-300 hover:text-gray-100"
								>
									Services
								</a>
							</li>
							<li>
								<a
									href="/contact"
									className="text-gray-300 hover:text-gray-100"
								>
									Contact
								</a>
							</li>
							<li>
								<a
									href="/logout"
									className="text-gray-300 hover:text-gray-100 border border-gray-300 px-3 py-1 rounded-md"
								>
									Logout
								</a>
							</li>
						</ul>
					</nav>
					<section className="bg-gray-900 py-10 text-white">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<h2 className="text-3xl font-extrabold">
								Welcome to Our Website
							</h2>
							<p className="mt-4 max-w-2xl text-xl">
								We provide top-notch services to meet all your needs. Explore
								our website to learn more.
							</p>
							<div className="mt-10">
								<a
									href="/services"
									className="text-base font-medium text-indigo-400 hover:text-indigo-300"
								>
									Explore Services
								</a>
							</div>
						</div>
					</section>
					<section className="bg-gray-800 py-10 text-white">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<h2 className="text-3xl font-extrabold">Discover Our Features</h2>
							<p className="mt-4 max-w-2xl text-xl">
								Experience the latest technology and innovation with our
								cutting-edge features.
							</p>
							<div className="mt-10">
								<a
									href="/features"
									className="text-base font-medium text-indigo-400 hover:text-indigo-300"
								>
									Explore Features
								</a>
							</div>
						</div>
					</section>
					<footer className="bg-slate-900 py-5 text-white text-center">
						<p>&copy; 2022 Your Company. All rights reserved.</p>
					</footer>
				</div>
			) : (
				// Display message or redirect to login if user is not verified
				<div className="min-h-screen flex items-center justify-center bg-gray-100">
					<div className="text-center">
						<p className="text-xl text-gray-800">
							You are not authorized to view this page.
						</p>
						<p className="mt-4 text-sm text-gray-600">
							Please <a href="/login">login</a> or verify your account.
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
