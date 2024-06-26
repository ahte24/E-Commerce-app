/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Page = () => {
	const [isSeller, setisSeller] = useState(false);
	const [userData, setUserData] = useState({
		username: "",
		email: "",
		password: "",
		isSeller: false,
	});

	const handleChange = (e) => {
		setisSeller(e.target.checked);
		const { name, value } = e.target;
		setUserData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSignup = async () => {
		try {
			const response = await fetch("http://localhost:5000/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...userData, id: uuidv4(), isSeller: isSeller }),
			});

			if (response.ok) {
				setUserData({ username: "", email: "", password: "" });
				window.location.href = "/signin";
			} else {
				console.error("Failed to create user");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleSignup();
	};

	return (
		<div>
			<div className="h-[91vh] flex flex-col items-center justify-center bg-slate-100">
				<div className="flex flex-col bg-slate-200 shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
					<div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
						Create Your Account
					</div>
					<div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
						Sign up to get started!
					</div>
					<div className="mt-6">
						<form action="#">
							<div className="flex flex-col mb-5">
								<label
									htmlFor="username"
									className="mb-1 text-xs tracking-wide text-gray-600"
								>
									Username:
								</label>
								<div className="relative">
									<div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
										<i className="fas fa-user "></i>
									</div>
									<input
										onChange={handleChange}
										id="username"
										type="text"
										name="username"
										className="text-sm placeholder-gray-500 px-4 rounded-2xl border border-gray-400 w-full py-2 text-black focus:outline-none "
										placeholder="Enter your username"
									/>
								</div>
							</div>
							<div className="flex flex-col mb-5">
								<label
									htmlFor="email"
									className="mb-1 text-xs tracking-wide text-gray-600"
								>
									E-Mail Address:
								</label>
								<div className="relative">
									<div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
										<i className="fas fa-at "></i>
									</div>
									<input
										onChange={handleChange}
										id="email"
										type="email"
										name="email"
										className="text-sm placeholder-gray-500 px-4 rounded-2xl border border-gray-400 w-full py-2 text-black focus:outline-none "
										placeholder="Enter your email"
									/>
								</div>
							</div>
							<div className="flex flex-col mb-3">
								<label
									htmlFor="password"
									className="mb-1 text-xs tracking-wide text-gray-600"
								>
									Password:
								</label>
								<div className="relative">
									<div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
										<i className="fas fa-lock "></i>
									</div>
									<input
										onChange={handleChange}
										id="password"
										type="password"
										name="password"
										className="text-sm placeholder-gray-500 px-4 rounded-2xl border text-black border-gray-400 w-full py-2 focus:outline-none"
										placeholder="Enter your password"
									/>
								</div>
							</div>
							<div className="flex items-center mb-3">
								<label
									htmlFor="isSeller"
									className="text-sm tracking-wide text-gray-600"
								>
									Seller account :
								</label>
								<div className="flex items-center ml-4">
									<input
										onChange={handleChange}
										checked={isSeller}
										id="isSeller"
										type="checkbox"
										name="isSeller"
										className="placeholder-gray-500 rounded-2xl"
									/>
								</div>
							</div>

							<div className="flex w-full">
								<button
									onClick={handleSubmit}
									type="submit"
									className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-black hover:font-bold transition-all rounded-2xl py-2 w-full  duration-150 ease-in"
								>
									<span className="mr-2 uppercase">Sign Up</span>
									<span>
										<svg
											className="h-6 w-6"
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path d="M5 12h14M12 5l7 7-7 7"></path>
										</svg>
									</span>
								</button>
							</div>
						</form>
					</div>
					<div className="flex justify-center items-center mt-6">
						<div className="text-center text-sm text-gray-600 mr-4">
							Or Sign up with
						</div>
						<div className=" flex justify-center">
							<a href="#" className="mr-4">
								<img src="/icons/github.png" alt="GitHub" className="w-6 h-6" />
							</a>
							<a href="#" className="mr-4">
								<img src="/icons/google.png" alt="Google" className="w-6 h-6" />
							</a>
							<a href="#" className="mr-4">
								<img
									src="/icons/facebook.png"
									alt="Facebook"
									className="w-6 h-6"
								/>
							</a>
						</div>
					</div>
					<div className="flex justify-center items-center mt-6">
						<Link
							href="/signin"
							className="inline-flex items-center font-bold text-black text-xs text-center"
						>
							<span>
								<svg
									className="h-6 w-6"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path d="M16 17l-4 4m0 0l-4-4m4 4V3"></path>
								</svg>
							</span>
							<span className="ml-2">Already have an account? Login!</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
