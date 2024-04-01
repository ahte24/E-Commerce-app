"use client";
import React, { useState, useEffect } from "react";

const Navbar = () => {
	const [isUserVerified, setisUserVerified] = useState(false);
	const handleLogout = async () => {
		localStorage.removeItem("token");
		window.location.href = "/signin";
	};

	const handleProfile = () => {
		if (isUserVerified) {
			window.location.href = "/profile";
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setisUserVerified(true);
		}
	}, []);

	return (
		<div className="sticky top-0 bg-slate-200">
			<nav className="flex justify-between items-center h-[9vh] px-6 py-6 container m-auto">
				<div className="font-normal text-3xl">LuxeAura Attire</div>
				<ul className="flex gap-6 items-center font-normal">
					<div className="flex items-center">
						<div className="relative">
							<input
								type="text"
								className="w-[30vw] h-[4vh] rounded-lg px-3 outline-none pr-9"
								placeholder="Search"
							/>
							<a href="">
								<svg
									className="absolute top-[5px] right-2"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>Search Icon</title>
									<path
										d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z"
										stroke="#717478"
										strokeWidth="1.4"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M16 16L21 21"
										stroke="#717478"
										strokeWidth="1.4"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
								</svg>
							</a>
						</div>
					</div>
					<a
						className="w-[50px] hover:font-bold flex justify-center transition-all"
						href=""
					>
						<li>Home</li>
					</a>
					<a
						className="w-[50px] hover:font-bold flex justify-center transition-all"
						href=""
					>
						<li>Deals</li>
					</a>
					<a
						className="w-[90px] hover:font-bold flex justify-center transition-all"
						href=""
					>
						<li>New Arrive</li>
					</a>
					<a
						className="w-[80px] hover:font-bold flex justify-center transition-all"
						href=""
					>
						<li>Packages</li>
					</a>
					<a
						className="w-[60px] hover:font-bold flex justify-center cursor-pointer transition-all "
						onClick={() => {
							handleProfile();
						}}
					>
						<li>Profile</li>
					</a>
					{isUserVerified ? (
						<button
							onClick={handleLogout}
							className="bg-black hover:font-bold w-[80px] text-white flex justify-center py-[4px] rounded-lg transition-all"
						>
							<li>Logout</li>
						</button>
					) : (
						<>
							<a
								className="bg-black hover:font-bold w-[80px] text-white flex justify-center py-[4px] rounded-lg transition-all"
								href="/signup"
							>
								<li>Sign Up</li>
							</a>
						</>
					)}
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
