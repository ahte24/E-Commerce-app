import Image from "next/image";

export default function Home() {
	return (
		<main
			className="flex min-h-screen flex-col items-center justify-center p-8"
			style={{ backgroundColor: "#333", color: "#fff" }}
		>
			<nav className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center">
				<div className="flex items-center">
					<h1 className="text-2xl font-bold">My Simple Dark Website</h1>
				</div>
				<div className="flex items-center">
					<a href="/login" className="mx-4 text-blue-500 hover:underline">
						Login
					</a>
					<a
						href="/signup"
						className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in"
					>
						Sign Up
					</a>
				</div>
			</nav>

			<div className="grid place-items-center text-center">
				<h2 className="text-3xl font-bold mb-4 text-blue-500">
					Welcome to My Simple Dark Website
				</h2>
				<p className="text-lg text-gray-300">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</p>
			</div>
		</main>
	);
}
