import React from "react";
import { Gap } from "../../../../../public/images";
import Image from "next/image";
import Button from "@/components/button";
import Link from "next/link";

const Ready = () => {
	return (
		<main className="bg-[conic-gradient(from_180deg_at_100%_-28.91%,#020618_0deg,#59168B_197.31deg,#111827_360deg)] pt-10 relative">
			<Image src={Gap} alt="gap" className="w-full h-full object-cover" />

			<div className="absolute inset-0 flex items-center justify-center">
				<div className="text-center text-white max-w-4xl px-6">
					<h2 className="text-xl md:text-4xl font-bold mb-6">
						Ready to Start Learning?
					</h2>
					<div className="flex flex-col items-center justify-center gap-8">
						<p className="text-white/90 text-[15px] leading-relaxed max-w-lg">
							Join thousands of successful learners who have advanced their careers
							with our comprehensive skill development programs.
						</p>
						<div className="flex items-center gap-5 w-full">
							<Button className="bg-purple-600 px-2 py-3 w-full md:w-1/2 text-black font-normal rounded-[25px] text-center hover:bg-purple-700 text-[13px] md:text-[14px]">
								<Link href="/register">Create an Account</Link>
							</Button>
							<Button className="bg-pink-800 px-2 py-3 w-full md:w-1/2 text-black font-normal rounded-[25px] text-center hover:bg-pink-900 text-[13px] md:text-[14px]">
								Become an instructor
							</Button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Ready;
