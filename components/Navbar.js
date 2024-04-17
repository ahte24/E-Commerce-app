"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
	const [isUserVerified, setisUserVerified] = useState(false);
	const [isSeller, setisSeller] = useState(false);
	const handleLogout = async () => {
		localStorage.removeItem("token");
		window.location.href = "/";
	};
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setisUserVerified(true);
		}
	}, []);

	const handleProfile = () => {
		if (isUserVerified) {
			window.location.href = "/profile";
		} else {
			window.location.href = "/signin";
		}
	};

	return (
		<div className=" bg-slate-200">
			<nav className="flex justify-between items-center h-[7vh] px-2 py-6 container m-auto">
				<Link href="/">
					<div className="font-normal text-3xl">LuxeAura Attire</div>
				</Link>
				<div className="flex items-center">
					<div className="relative">
						<input
							type="text"
							className="w-[30vw] h-[4.5vh] rounded-xl px-3 outline-none pr-9"
							placeholder="Search"
						/>
						<Link href="">
							<svg
								className="absolute top-[8px] right-2"
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
						</Link>
					</div>
				</div>
				<ul className="flex gap-10 items-center font-normal">
					<Link href="/profile">
						<div className="flex items-center gap-4 font-semibold">
							<lord-icon
								src="https://cdn.lordicon.com/kthelypq.json"
								trigger="hover"
							></lord-icon>
							<span>Profile</span>
						</div>
					</Link>
					<Link href={"/"}>
						<div className="flex items-center gap-4 font-semibold">
							<lord-icon
								src="https://cdn.lordicon.com/xyboiuok.json"
								trigger="hover"
							></lord-icon>
							<span>Whishlist</span>
						</div>
					</Link>
					<Link href={"/"}>
						<div className="flex items-center gap-4 font-semibold">
							<script src="https://cdn.lordicon.com/lordicon.js"></script>
							<lord-icon
								src="https://cdn.lordicon.com/mfmkufkr.json"
								trigger="hover"
							></lord-icon>
							<span>Cart</span>
						</div>
					</Link>
					{isUserVerified ? (
						<Link
							onClick={handleLogout}
							href="/"
							className="bg-black hover:font-bold w-[120px] text-white flex justify-center py-[4px] rounded-lg transition-all"
						>
							<li>Sign out</li>
						</Link>
					) : (
						<>
							<Link
								className="bg-black hover:font-bold w-[120px] text-white flex justify-center py-[4px] rounded-lg transition-all"
								href="/signin"
							>
								<li>Sign in</li>
							</Link>
						</>
					)}
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
