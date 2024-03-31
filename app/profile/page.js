"use client";
import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
	const [data, setData] = useState(null);
	const [verified, setVerified] = useState(false); // State to track verification status

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
			{" "}
			{verified ? (
				<div className="min-h-[91vh] bg-slate-100 flex">
					<div className=" w-1/5 p-2 flex flex-col items-center overflow-auto">
						<Image
							className="rounded-full h-24 w-24 mt-4 object-cover"
							src="/icons/az.jpg"
							width={500}
							height={500}
							alt="Profile Image"
						/>
						<h1 className=" mt-2 ">ahtesham_24</h1>
						<h1 className="text-xl mt-1 font-medium">Mohamed Ahtesham</h1>
						<div className="bg-slate-200 cursor-pointer hover:bg-slate-300 transition-all w-full h-[7vh] rounded-lg mt-6 flex justify-center items-center font-medium">
							Edit Profile
						</div>
						<div className="bg-slate-200 cursor-pointer hover:bg-slate-300 transition-all w-full h-[7vh] rounded-lg mt-6 flex justify-center items-center font-medium">
							Orders
						</div>
						<div className="bg-slate-200 cursor-pointer hover:bg-slate-300 transition-all w-full h-[7vh] rounded-lg mt-6 flex justify-center items-center font-medium">
							Address
						</div>
						<div className="bg-slate-200 cursor-pointer hover:bg-slate-300 transition-all w-full h-[7vh] rounded-lg mt-6 flex justify-center items-center font-medium">
							Payment Options
						</div>
						<div className="bg-slate-200 cursor-pointer hover:bg-slate-300 transition-all w-full h-[7vh] rounded-lg mt-6 flex justify-center items-center font-medium">
							Wallet Balance
						</div>
						<div className="bg-slate-200 cursor-pointer hover:bg-slate-300 transition-all w-full h-[7vh] rounded-lg mt-6 flex justify-center items-center font-medium">
							Login and Security
						</div>
						<div className="bg-slate-200 cursor-pointer hover:bg-slate-300 transition-all w-full h-[7vh] rounded-lg mt-6 flex justify-center items-center font-medium">
							Contact Us
						</div>
					</div>
					<div className="bg-slate-50 w-4/5"></div>
				</div>
			) : (
				<div className="min-h-[91vh] bg-slate-100"></div>
			)}
		</div>
	);
};

export default Page;
