"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

export default function Home() {
	// useEffect(() => {
	// 	async function fetchData() {
	// 		try {
	// 			let token = localStorage.getItem("token");
	// 			if (!token) {
	// 				window.location.href = "/signin";
	// 				setVerified(false);
	// 				return;
	// 			}

	// 			// Ensure token is a string
	// 			token = String(token);

	// 			const response = await fetch("http://localhost:5000/pro", {
	// 				method: "GET",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 					Authorization: `Bearer ${token}`, // Fixed the capitalization of "Authorization"
	// 				},
	// 			});

	// 			if (!response.ok) {
	// 				console.error("Error fetching data:", response.statusText);
	// 				if (response.status === 401) {
	// 					// Check for unauthorized status (401)
	// 					localStorage.removeItem("token"); // Remove the invalid token
	// 					setVerified(false);
	// 					window.location.href = "/login"; // Redirect to login page
	// 				} else {
	// 					// Handle other errors (optional)
	// 					localStorage.removeItem("token"); // Remove the invalid token
	// 					setVerified(false);
	// 					window.location.href = "/login";
	// 					console.log("error occured");
	// 				}
	// 				return;
	// 			}
	// 			const responseData = await response.json();
	// 			setData(responseData);
	// 			setVerified(true); // Set verified to true if successful
	// 		} catch (error) {
	// 			console.error("Error fetching data:", error);
	// 		}
	// 	}
	// 	fetchData();
	// }, []);
	return <div className="min-h-[92vh] bg-slate-100"></div>;
}
