"use client";
import React, { useState, useEffect } from "react";

const Navbar = () => {
	const [isUserVerified, setisUserVerified] = useState(false);
	const handleLogout = async () => {
		localStorage.removeItem("token");
		window.location.href = "/signin";
	};
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setisUserVerified(true);
		}
	}, []);

	return (
		<div className="sticky top-0">
			<nav className="flex justify-between items-center h-[9vh] px-6 py-6 bg-slate-200 ">
				<div className="font-normal text-3xl">LuxeAura Attire</div>
				<ul className="flex gap-6 items-center font-normal">
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
						className="w-[60px] hover:font-bold flex justify-center transition-all "
						href="/profile"
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
