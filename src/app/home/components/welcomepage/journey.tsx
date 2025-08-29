import React from "react";
import Container from "@/components/container/Container";

const journeyData = [
	{
		step: "01",
		title: "Choose Your Path",
		description:
			"Select from our curated collection of expert designed courses tailored to your career goals and skill level.",
	},
	{
		step: "02",
		title: "Learn & Practice",
		description:
			"Engage with interactive lessons, hands-on projects and real-world scenarios to build practical skills.",
	},
	{
		step: "03",
		title: "Get Certified",
		description:
			"Earn industry-recognized certificates that validate your expertise and boost your professional credibility.",
	},
	{
		step: "04",
		title: "Join Community",
		description:
			"Connect with fellow learners, mentors, and industry experts in our thriving professional network.",
	},
];

const Journey = () => {
	return (
		<main className="bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950 pt-4">
			<Container alt>
				<div className=" text-center">
					<div className="mb-12">
						<h2 className="text-4xl font-bold mb-2 text-white">
							Your Journey to
							<br />
							<span className="bg-gradient-to-r from-purple-600 via-cyan-400 to-purple-600 bg-clip-text text-transparent">
								Professional Excellence
							</span>
						</h2>
						<p className="text-white text-lg max-w-2xl mx-auto">
							Transform your career with our proven 4-step learning methodology.
						</p>
					</div>

					<div className="flex justify-center gap-[30px]">
						{journeyData.map((item) => (
							<div
								key={item.step}
								className="w-max p-8 rounded-xl backdrop-blur-lg border border-gray-800 shadow-lg text-left bg-gradient-to-r from-[#111827] to-[#020618]"
							>
								<div className="text-base font-bold mb-4 bg-purple-600 w-max text-white py-[10px] px-4 rounded-[8px]">
									{item.step}
								</div>
								<h3 className=" font-semibold text-white mb-2">
									{item.title}
								</h3>
								<p className=" text-sm text-gray-300">{item.description}</p>
							</div>
						))}
					</div>

					<div className="pt-[75px] pb-[80px]">
						<button className="bg-gradient-to-r from-[#59168B] to-[#831843] text-white font-semibold  py-4 px-5 text-sm rounded-full shadow-lg transition-all duration-300 transform ">
							Ready to start? → Begin Your Journey
						</button>
					</div>
				</div>
			</Container>
		</main>
	);
};

export default Journey;
