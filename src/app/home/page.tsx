// import ErrorTest from "@/components/ErrorTest";
import CourseExplorationSection from "./components/welcomepage/courseExplorationSection";
import HeroSection from "./components/welcomepage/heroSection";
// import Register from "../register/page";
import Journey from "./components/welcomepage/journey";
import Ready from "./components/welcomepage/ready";
import Steller from "./components/welcomepage/steller";
import Trusted from "./components/welcomepage/trusted";
// import PrinciplesSection from "../about/components/principlesSection";

const welcomePage = () => {
  return (
    <div className="">
      <HeroSection />
      <div className="">
        <Trusted />
        <Journey />
        <CourseExplorationSection />
        <Steller />
        {/* <ErrorTest /> */}
        {/* <section className="mt-4 md:mt-20 ">
        <Ready />
      </div>
    </div>
  );
};

export default welcomePage;

{
  /* <section className="mt-4 md:mt-20 ">
					<div className="bg-gradient-to-b  from-[#1F293700] to-pink-900 py-6 px-10 grid gap-8 w-full md:w-full lg:w-8/12 mx-auto md:bg-gradient-to-r ">
						<h4 className="hidden text-4xl font-medium text-purple-300 md:ml-52 lg:ml-40  md:block">
							Pay with stellar
						</h4>
						<div className="grid gap-6 md:flex md:gap-16 ">
							<div className="w-[150px] h-[150px] md:w-[300px] md:h-[296.28px] mx-auto">
								<Image
									src="/images/Stellar-icon.png"
									alt="Pay with Stellar"
									width={200}
									height={295.48}
									className="w-full"
								/>
							</div>

							<div className="grid gap-4">
								<h4 className="text-center text-2xl font-medium text-purple-300  md:hidden">
									Pay with stellar
								</h4>
								<div>
									<p className="text-[13px] -ml-6 md:text-[15px]">
										Skillcert uses Stellar cryptocurrency for all transactions,
										including course enrollments and instructor payouts. Stellar
										offers:
									</p>
									<ul className="text-[13px] md:text-[15px]">
										{[
											"Fast and secure transactions",
											"Low transaction fee",
											"Global accessibility",
											"Easy integration with our platform",
										].map((item, index) => (
											<li key={index} className="list-disc">
												{item}
											</li>
										))}
									</ul>
								</div>

								<Button
									asChild
									className="bg-cyan-400 px-2 py-4 w-4/5 md:w-2/5 text-black font-normal rounded-[25px] text-center hover:bg-cyan-500 text-[13px] md:text-[15px]"
								>
									<a
										href="https://stellar.org/es"
										target="_blank"
										rel="noopener noreferrer"
									>
										Learn more about Stellar
									</a>
								</Button>
							</div>
						</div>
					</div>
				</section> */}

        {/* <section className="mt-4 md:mt-10 ">
					<div className="w-full md:w-7/12 mx-auto grid gap-2">
						{" "}
						<h3 className="text-center font-medium text-2xl text-purple-600 md:text-4xl">
							Ready to Start Learning?
						</h3>
						<p className="text-center text-[13px] md:text-[13px]">
							Join thousands of students and instructors in our growing community.
						</p>
						<div className="grid md:flex gap-4  md:w-2/3 md:gap-8 mx-auto justify-between pt-4">
							{" "}
							<Button
								asChild
								className="bg-purple-600 px-2 py-4 w-full md:w-1/2 text-black font-normal rounded-[25px] text-center hover:bg-purple-700 text-[13px] md:text-[14px]"
							>
								<Link href="/register">Create an Account</Link>
							</Button>
							<Button className="bg-pink-800 px-2 py-4 w-full md:w-1/2 text-black font-normal rounded-[25px] text-center hover:bg-pink-900 text-[13px] md:text-[14px]">
								Become an instructor
							</Button>
						</div>
					</div>
				</section> */}
        <Ready />
      </div>
    </div>
  );
};

export default welcomePage;
// 				</section> */
// }
