"use client";
import Link from "next/link";

export default function Home() {
	return (
		<div className="bg-slate-100 mx-auto p-2">
			<div className="rounded-md container mx-auto pt-4 flex flex-col gap-5">
				<div className="h-[50vh] bg-gray-400 rounded-md container">
					<Link
						className="h-[50vh] bg-gray-400 rounded-full relative"
						href="/items"
					>
						<img
							className="object-fill h-full w-full rounded-md relative"
							src="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/9be788ff-39a4-4214-99d0-fc97505aae5a1658752545685-USPA_Desk_Banner.jpg"
							alt=""
						/>
						<div className="absolute bottom-7 right-[160px] font-medium text-lg px-5 py-2 bg-slate-200">
							Shop Now
						</div>
					</Link>
				</div>

				<div className="flex gap-10  justify-center container">
					<div className=" w-[10vw] mt-4 rounded-md p-2 flex flex-col gap-1 bg-gray-300">
						<div className="h-full bg-white rounded-md">
							<img
								src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/18331852/2022/9/6/28618a63-e02a-4198-80cf-a25d04edb4031662463001991-Anouk-Men-Blue-Bandhani-Printed-Pure-Cotton-Kurta-3871662463-1.jpg"
								className="h-full w-full  object-fit"
								alt=""
							/>
						</div>
						<h1 className="font-normal text-center">Men Ethnic</h1>
					</div>
					<div className=" w-[10vw] mt-4 rounded-md p-2 flex flex-col gap-1 bg-gray-300">
						<div className="h-full bg-white rounded-md">
							<img
								src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/25234310/2023/9/26/d6241239-dca6-4347-b0e9-f8b57181d25d1695713495036KurtaSets1.jpg"
								className="h-full w-full  object-fit"
								alt=""
							/>
						</div>
						<h1 className="font-normal  text-center">Suit</h1>
					</div>
					<div className=" w-[10vw] mt-4 rounded-md p-2 flex flex-col gap-1 bg-slate-200">
						<div className="h-full bg-white rounded-md">
							<img
								src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/9162839/2022/7/13/28a52ba2-21b2-4e1d-a5cb-09b3ce7be6121657686472756HIGHLANDERMenBlackTaperedFitMid-RiseCleanLookStretchableJean2.jpg"
								className="h-full w-full  object-fit"
								alt=""
							/>
						</div>
						<h1 className="font-normal text-center">Jeans</h1>
					</div>
					<div className=" w-[10vw] mt-4 rounded-md p-2 flex flex-col gap-1 bg-slate-200">
						<div className="h-full bg-white rounded-md">
							<img
								src="https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/28083484/2024/3/7/2f30745d-1292-4b06-a05e-145c45bdf1eb1709781903155CLAFOUTISMenV-NeckPolyesterPUCoatedPocketsT-shirt1.jpg"
								className="h-full w-full  object-fit"
								alt=""
							/>
						</div>
						<h1 className="font-normal text-center">Shirt</h1>
					</div>
					<div className=" w-[10vw] mt-4 rounded-md p-2 flex flex-col gap-1 bg-slate-200">
						<div className="h-full bg-white rounded-md">
							<img
								src="https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/16713286/2023/10/13/32fd6cdc-40ef-4b42-b461-d5d7592b37221697199670862TheSouledStoreSolidMushroomOversizedT-Shirts1.jpg"
								className="h-full w-full  object-fit"
								alt=""
							/>
						</div>
						<h1 className="font-normal text-center">T-shirt</h1>
					</div>
					<div className=" w-[10vw] mt-4 rounded-md p-2 flex flex-col gap-1 bg-slate-200">
						<div className="h-full bg-white rounded-md">
							<img
								src="https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/17027658/2023/2/23/05b790c4-eb53-4262-99f5-868e6c87a6d11677151339137TitanMenBlackPrintedDialBlackLeatherStrapsAnalogueWatch1.jpg"
								className="h-full w-full  object-fit"
								alt=""
							/>
						</div>
						<h1 className="font-normal text-center">Watches</h1>
					</div>
					<div className=" w-[10vw] mt-4 rounded-md p-2 flex flex-col gap-1 bg-slate-200">
						<div className="h-full bg-white rounded-md">
							<img
								src="https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/26516244/2024/3/26/dc60c121-be80-42de-a539-7e00a6a69ffe1711430612557-ADIDAS-Men-Sports-Shoes-7611711430612292-1.jpg"
								className="h-full w-full  object-fit"
								alt=""
							/>
						</div>
						<h1 className="font-normal text-center">Shoe</h1>
					</div>
				</div>

				<div className="w-full bg-gray-400 h-[50vh] mt-4 rounded-md">
					<img
						src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-160424-DailyBanner-Z6-P2-bullmer-orchidblue-starting199.jpg"
						className="object-fill  h-full w-full"
						alt=""
					/>
				</div>
			</div>
		</div>
	);
}
