"use client";
import React from "react";
import { Clock, Users, ArrowRight } from "lucide-react";
import { useState } from "react";
import { grantAccess } from "../../../../../contract_connections/CourseRegistry/grantAccess";
import Link from "next/link";
import Container from "@/components/container/Container";

interface Course {
	id: string;
	title: string;
	instructor: string;
	duration: string;
	students: number;
	price: string;
}

const courses: Course[] = [
	{
		id: "1",
		title: "Advanced React Development",
		instructor: "Jhon Miller",
		duration: "12 weeks",
		students: 134,
		price: "120 XLM",
	},
	{
		id: "2",
		title: "Machine Learning Fundamentals",
		instructor: "Jhon Miller",
		duration: "12 weeks",
		students: 134,
		price: "120 XLM",
	},
	{
		id: "3",
		title: "UI/UX Design Mastery",
		instructor: "Jhon Miller",
		duration: "12 weeks",
		students: 134,
		price: "120 XLM",
	},
];

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
	const [userAddress, setUserAddress] = useState("0x1234567890123456789012345678901234567890");

	const handleEnroll = async (courseId: string) => {
		const result = await grantAccess({
			course_id: courseId,
			user: userAddress,
		});
		if (result.success) {
			alert("Enrollment successful!");
		} else {
			alert(`Enrollment failed: ${result.error}`);
		}
	};

	return (
		<div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl">
			<div className={`h-[150px] bg-gradient-to-r from-purple-700 to-pink-700`}></div>
			<div className=" py-5 px-4">
				<h3 className="text-xl font-bold text-white mb-3">{course.title}</h3>

				<p className="text-gray-400 mb-2 text-sm">By {course.instructor}</p>

				<div className="flex items-center gap-4 mb-6 text-gray-400 text-sm">
					<div className="flex items-center gap-1">
						<Clock size={16} />
						<span>{course.duration}</span>
					</div>
					<div className="flex items-center gap-1">
						<Users size={16} />
						<span>{course.students}</span>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<span className="text-[19px] font-bold text-white">{course.price}</span>
					<button
						className="bg-gradient-to-r from-purple-700 to-pink-700 text-white px-[12px] py-2 rounded-[12px]  text-[14px] font-semibold flex items-center gap-2 group"
						onClick={() => handleEnroll(course.id)}
					>
						Enroll Now
						<ArrowRight
							size={16}
							className="group-hover:translate-x-1 transition-transform duration-300"
						/>
					</button>
				</div>
			</div>
		</div>
	);
};

const courseExplorationSection: React.FC = () => {
	return (
		<section className="bg-gray-900 py-[80px]">
			<Container alt>
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold text-white mb-4">Featured Courses</h2>
					<p className="text-gray-400 text-lg max-w-2xl mx-auto">
						Discover our most popular courses designed to accelerate your career growth
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
					{courses.map((course) => (
						<CourseCard key={course.id} course={course} />
					))}
				</div>

				<div className="text-center pt-[30px]">
					<Link
						href="/coursesPage"
						className="bg-gradient-to-r from-[#9333EA] to-[#FB64B6] text-white px-8 py-3 rounded-[16px] border border-white font-semibold text-lg"
					>
						<button>Explore all courses in the app</button>
					</Link>
				</div>
			</Container>
		</section>
	);
};

export default courseExplorationSection;
