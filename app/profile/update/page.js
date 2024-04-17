import React from "react";

const page = () => {
	return (
		<div className="container mx-auto py-8">
			<div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
				<div className="px-6 py-4">
					<h2 className="text-2xl font-semibold text-gray-800 mb-2">
						Update Profile
					</h2>
					<form>
						<div className="mb-4">
							<label
								htmlFor="name"
								className="block text-gray-700 font-semibold mb-2"
							>
								Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								className="form-input w-full"
								placeholder="Your name"
								required
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="username"
								className="block text-gray-700 font-semibold mb-2"
							>
								Username
							</label>
							<input
								type="text"
								id="username"
								name="username"
								className="form-input w-full"
								placeholder="Your username"
								required
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="email"
								className="block text-gray-700 font-semibold mb-2"
							>
								Email Address
							</label>
							<input
								type="email"
								id="email"
								name="email"
								className="form-input w-full"
								placeholder="Your email address"
								required
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="mobile"
								className="block text-gray-700 font-semibold mb-2"
							>
								Mobile Number
							</label>
							<input
								type="tel"
								id="mobile"
								name="mobile"
								className="form-input w-full"
								placeholder="Your mobile number"
								required
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="address"
								className="block text-gray-700 font-semibold mb-2"
							>
								Address
							</label>
							<textarea
								id="address"
								name="address"
								className="form-textarea w-full"
								rows="3"
								placeholder="Your address"
								required
							></textarea>
						</div>
						<div className="mt-6">
							<button
								type="submit"
								className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
							>
								Update Profile
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default page;
