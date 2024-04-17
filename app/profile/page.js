"use client";
import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
	const [data, setData] = useState(null);
	const [verified, setVerified] = useState(false); // State to track verification status
	const handleSignin = () => {
		window.location.href = "/signin";
	};

	useEffect(() => {
		async function fetchData() {
			try {
				let token = localStorage.getItem("token");
				if (!token) {
					window.location.href = "/signin";
					setVerified(false);
					return;
				}
				// Ensure token is a string
				token = String(token);

				const response = await fetch("http://localhost:5000/pro", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`, // Fixed capitalization of "Authorization"
					},
				});

				if (!response.ok) {
					console.error("Error fetching data:", response.statusText);
					localStorage.removeItem("token");
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
			{" "}
			{verified ? (
				<div className="min-h-[91vh] bg-slate-100 flex">
					<div className=" w-1/5 p-2 flex flex-col items-center overflow-auto">
						<Image
							className="rounded-full h-24 w-24 mt-4 object-cover"
							src="/icons/az.jpg" // Assuming the image is in the 'public' directory
							alt="Profile Image"
							width={240} // Set width to desired value (e.g., 24px)
							height={240} // Set height to desired value (e.g., 24px)
						/>
						<h1 className=" mt-2 ">ahtesham_24</h1>
						<h1 className="text-xl mt-1 font-medium">Mohamed Ahtesham</h1>
						<Link
							href="/profile/update"
							className="bg-slate-200 cursor-pointer hover:bg-slate-300 transition-all w-full h-[7vh] rounded-lg mt-6 flex justify-center items-center font-medium"
						>
							<div>Edit Profile</div>
						</Link>
						<Link
							href="/"
							className="bg-slate-200 cursor-pointer hover:bg-slate-300 transition-all w-full h-[7vh] rounded-lg mt-6 flex justify-center items-center font-medium"
						>
							<div>Orders</div>
						</Link>
						<Link
							href="/"
							className="bg-slate-200 cursor-pointer hover:bg-slate-300 transition-all w-full h-[7vh] rounded-lg mt-6 flex justify-center items-center font-medium"
						>
							<div>Address</div>
						</Link>
						<Link
							href="/"
							className="bg-slate-200 cursor-pointer hover:bg-slate-300 transition-all w-full h-[7vh] rounded-lg mt-6 flex justify-center items-center font-medium"
						>
							<div>Payment Options</div>
						</Link>
						<Link
							href="/"
							className="bg-slate-200 cursor-pointer hover:bg-slate-300 transition-all w-full h-[7vh] rounded-lg mt-6 flex justify-center items-center font-medium"
						>
							<div>Wallet Balance</div>
						</Link>
						<Link
							href="/"
							className="bg-slate-200 cursor-pointer hover:bg-slate-300 transition-all w-full h-[7vh] rounded-lg mt-6 flex justify-center items-center font-medium"
						>
							<div>Login and Security</div>
						</Link>
						<Link
							href="/"
							className="bg-slate-200 cursor-pointer hover:bg-slate-300 transition-all w-full h-[7vh] rounded-lg mt-6 flex justify-center items-center font-medium"
						>
							<div>Contact Us</div>
						</Link>
					</div>
					<div className="bg-slate-50 w-4/5"></div>
				</div>
			) : (
				<div className="min-h-[91vh] bg-slate-100 ">
					<div className="bg-red-200 p-4 rounded-lg shadow-md">
						<p className="text-red-800 font-semibold">Session expired.</p>
						<p className="text-red-700">Please logout and try again.</p>
						<span
							onClick={() => {
								handleSignin();
							}}
							className="text-red-700 cursor-pointer"
						>
							Login again
						</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default Page;
