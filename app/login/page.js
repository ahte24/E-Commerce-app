"use client";
/* eslint-disable @next/next/no-img-element */
import { React, useState } from "react";

const Page = () => {
	const [userData, setUserData] = useState({ email: "", password: "" });

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleLogin = async () => {
		try {
			const response = await fetch("http://localhost:5000/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(userData),
			});
			if (response.ok) {
				console.log("login successfull");
				setUserData({ email: "", password: "" });
			} else {
				console.error("Failed to login user");
			}
		} catch (error) {
			console.error("Error: ", error);
		}
	};

	const handleSubmit = async (e) => {
		// e.preventDefault();
		handleLogin();
	};

	return (
		<div>
			<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
				<div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
					<div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
						Welcome Back
					</div>
					<div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
						Enter your credentials to access your account
					</div>

					<div className="mt-10">
						<form action="#">
							<div className="flex flex-col mb-5">
								<label
									htmlFor="email"
									className="mb-1 text-xs tracking-wide text-gray-600"
								>
									E-Mail
								</label>
								<div className="relative">
									<div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
										<i className="fas fa-at text-blue-500"></i>
									</div>

									<input
										id="email"
										type="email"
										name="email"
										className="text-sm placeholder-gray-500 px-4 text-black rounded-2xl border border-gray-400 w-full py-2 text-black focus:outline-none focus:border-blue-400"
										placeholder="E-Mail"
										onChange={handleChange}
									/>
								</div>
							</div>

							<div className="flex flex-col mb-6">
								<label
									htmlFor="password"
									className="mb-1 text-xs tracking-wide text-gray-600"
								>
									Password:
								</label>
								<div className="relative">
									<div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
										<i className="fas fa-lock text-blue-500"></i>
									</div>

									<input
										onChange={handleChange}
										id="password"
										type="password"
										name="password"
										className="text-sm placeholder-gray-500 px-4 text-black rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
										placeholder="Enter your password"
									/>
								</div>
							</div>

							<div className="flex w-full">
								<button
									onClick={handleSubmit}
									type="submit"
									className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
								>
									<span className="mr-2 uppercase">Sign In</span>
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
							Or sign in with
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
						<a
							href="/signup"
							className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center"
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
							<span className="ml-2">You dont have an account?</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
