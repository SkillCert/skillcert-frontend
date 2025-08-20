"use client";
import React, { useState, useMemo } from "react";
import { Search, Filter, X } from "lucide-react";
import CourseCard from "./components/courseCard";
import CreateCourse from "./components/createCourse";
import { levels } from "@/lib/interface";
import { categories } from "@/lib/interface";
import { Course, CourseLevel, CourseCategory } from "@/lib/interface";

const coursesData: Course[] = [
	{
		id: 1,
		name: "React Fundamentals",
		category: "Web Development",
		level: "Beginner",
		rating: 4.7,
		students: 1250,
		description:
			"Learn the basics of React including components, state, and props. Perfect for beginners starting their journey.",
		duration: "8 weeks",
		price: 340.56,
	},
	{
		id: 2,
		name: "Advanced JavaScript",
		category: "Web Development",
		level: "Advanced",
		rating: 4.8,
		students: 890,
		description:
			"Deep dive into advanced JavaScript concepts including closures, prototypes, and async programming.",
		duration: "6 weeks",
		price: 450.75,
	},
	{
		id: 3,
		name: "Python for Data Science",
		category: "Data Science",
		level: "Intermediate",
		rating: 4.6,
		students: 2100,
		description:
			"Master Python programming for data analysis, visualization, and machine learning applications.",
		duration: "10 weeks",
		price: 520.3,
	},
	{
		id: 4,
		name: "UI/UX Design Basics",
		category: "Design & UI/UX",
		level: "Beginner",
		rating: 4.5,
		students: 1580,
		description:
			"Learn the fundamentals of user interface and user experience design principles and tools.",
		duration: "7 weeks",
		price: 380.9,
	},
	{
		id: 5,
		name: "Node.js Backend Development",
		category: "Web Development",
		level: "Intermediate",
		rating: 4.7,
		students: 940,
		description: "Build scalable backend applications using Node.js, Express, and MongoDB.",
		duration: "9 weeks",
		price: 410.25,
	},
	{
		id: 6,
		name: "Machine Learning Fundamentals",
		category: "Data Science",
		level: "Advanced",
		rating: 4.9,
		students: 750,
		description:
			"Introduction to machine learning algorithms, neural networks, and practical applications.",
		duration: "12 weeks",
		price: 680.5,
	},
	{
		id: 7,
		name: "Web Design with CSS",
		category: "Design & UI/UX",
		level: "Beginner",
		rating: 4.4,
		students: 1890,
		description: "Master CSS for creating beautiful, responsive web designs from scratch.",
		duration: "5 weeks",
		price: 290.4,
	},
	{
		id: 8,
		name: "DevOps and Cloud Computing",
		category: "DevOps & Cloud",
		level: "Advanced",
		rating: 4.6,
		students: 620,
		description: "Learn DevOps practices, containerization, and cloud deployment strategies.",
		duration: "11 weeks",
		price: 590.8,
	},
	{
		id: 9,
		name: "Data Visualization with D3.js",
		category: "Data Science",
		level: "Intermediate",
		rating: 4.3,
		students: 445,
		description:
			"Create interactive and compelling data visualizations using D3.js library and modern web standards.",
		duration: "6 weeks",
		price: 395.6,
	},
	{
		id: 10,
		name: "Figma for Designers",
		category: "Design & UI/UX",
		level: "Beginner",
		rating: 4.6,
		students: 1320,
		description:
			"Master Figma for creating professional UI designs, prototypes, and design systems.",
		duration: "4 weeks",
		price: 275.8,
	},
	{
		id: 11,
		name: "Docker & Kubernetes",
		category: "DevOps & Cloud",
		level: "Intermediate",
		rating: 4.7,
		students: 780,
		description:
			"Learn containerization with Docker and orchestration with Kubernetes for modern applications.",
		duration: "8 weeks",
		price: 510.25,
	},
	{
		id: 12,
		name: "Full Stack Web Development",
		category: "Web Development",
		level: "Advanced",
		rating: 4.8,
		students: 960,
		description:
			"Complete full stack development course covering frontend, backend, and database technologies.",
		duration: "16 weeks",
		price: 799.99,
	},
];

const CourseExplore: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [selectedCategories, setSelectedCategories] = useState<CourseCategory[]>([]);
	const [selectedLevels, setSelectedLevels] = useState<CourseLevel[]>([]);
	const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

	const filteredCourses = useMemo((): Course[] => {
		return coursesData.filter((course: Course) => {
			const matchesSearch: boolean =
				course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				course.description.toLowerCase().includes(searchTerm.toLowerCase());

			const matchesCategory: boolean =
				selectedCategories.length === 0 || selectedCategories.includes(course.category);

			const matchesLevel: boolean =
				selectedLevels.length === 0 || selectedLevels.includes(course.level);

			return matchesSearch && matchesCategory && matchesLevel;
		});
	}, [searchTerm, selectedCategories, selectedLevels]);

	const handleCategoryChange = (category: CourseCategory): void => {
		setSelectedCategories((prev: CourseCategory[]) =>
			prev.includes(category)
				? prev.filter((c: CourseCategory) => c !== category)
				: [...prev, category]
		);
	};

	const handleLevelChange = (level: CourseLevel): void => {
		setSelectedLevels((prev: CourseLevel[]) =>
			prev.includes(level) ? prev.filter((l: CourseLevel) => l !== level) : [...prev, level]
		);
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setSearchTerm(event.target.value);
	};

	const toggleMobileFilters = (): void => {
		setShowMobileFilters(!showMobileFilters);
	};

	return (
		<main className="min-h-screen bg-gray-900 py-4 sm:py-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
					<h1 className="text-2xl sm:text-3xl font-bold text-purple-400">
						Explore courses
					</h1>

					<div className="flex flex-col sm:flex-row gap-4 sm:items-center">
						<CreateCourse />
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<input
								type="text"
								placeholder="Search"
								value={searchTerm}
								onChange={handleSearchChange}
								className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none w-full sm:w-80"
							/>
						</div>
					</div>
				</div>

				<div className="lg:hidden mb-4">
					<button
						onClick={toggleMobileFilters}
						className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-700 transition-colors"
					>
						<Filter className="w-4 h-4" />
						<span>Filters</span>
						{(selectedCategories.length > 0 || selectedLevels.length > 0) && (
							<span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
								{selectedCategories.length + selectedLevels.length}
							</span>
						)}
					</button>
				</div>

				<div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
					<div
						className={`
            ${showMobileFilters ? "block" : "hidden"} lg:block
            fixed lg:relative inset-0 lg:inset-auto z-50 lg:z-auto
            bg-gray-900 lg:bg-transparent p-4 lg:p-0
            overflow-y-auto lg:overflow-visible
          `}
					>
						<div className="w-full lg:w-64 bg-gray-800 rounded-lg p-4 sm:p-6 h-fit">
							<div className="flex justify-between items-center mb-4 lg:hidden">
								<h2 className="text-white font-semibold">Filters</h2>
								<button
									onClick={toggleMobileFilters}
									className="text-gray-400 hover:text-white"
								>
									<X className="w-5 h-5" />
								</button>
							</div>

							<h2 className="text-white font-semibold mb-4 hidden lg:block">
								Filters
							</h2>

							<div className="mb-6">
								<h3 className="text-white font-medium mb-3">Categories</h3>
								<div className="space-y-2 sm:space-y-3">
									{categories.map((category: CourseCategory) => (
										<label
											key={category}
											className="flex items-center cursor-pointer group"
										>
											<div className="relative">
												<input
													type="checkbox"
													checked={selectedCategories.includes(category)}
													onChange={() => handleCategoryChange(category)}
													className="w-5 h-5 appearance-none bg-transparent border-2 border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 checked:bg-purple-600 checked:border-purple-600"
												/>
												{selectedCategories.includes(category) && (
													<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
														<svg
															className="w-4 h-4 text-white absolute top-[3px]"
															fill="currentColor"
															viewBox="0 0 20 20"
														>
															<path
																fillRule="evenodd"
																d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
																clipRule="evenodd"
															/>
														</svg>
													</div>
												)}
											</div>
											<span className="ml-3 mt-[-7px] text-sm sm:text-base text-white transition-colors">
												{category}
											</span>
										</label>
									))}
								</div>
							</div>

							<div>
								<h3 className="text-white font-medium mb-3">Level</h3>
								<div className="space-y-2 sm:space-y-3">
									{levels.map((level: CourseLevel) => (
										<label
											key={level}
											className="flex items-center cursor-pointer group"
										>
											<div className="relative">
												<input
													type="checkbox"
													checked={selectedLevels.includes(level)}
													onChange={() => handleLevelChange(level)}
													className="w-5 h-5 appearance-none bg-transparent border-2 border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 checked:bg-purple-600 checked:border-purple-600"
												/>
												{selectedLevels.includes(level) && (
													<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
														<svg
															className="w-4 h-4 text-white absolute top-[3px]"
															fill="currentColor"
															viewBox="0 0 20 20"
														>
															<path
																fillRule="evenodd"
																d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
																clipRule="evenodd"
															/>
														</svg>
													</div>
												)}
											</div>
											<span className="ml-3 mt-[-7px] text-sm sm:text-base text-white transition-colors">
												{level}
											</span>
										</label>
									))}
								</div>
							</div>

							{(selectedCategories.length > 0 || selectedLevels.length > 0) && (
								<div className="mt-6 pt-4 border-t border-gray-700">
									<button
										onClick={() => {
											setSelectedCategories([]);
											setSelectedLevels([]);
										}}
										className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
									>
										Clear All Filters
									</button>
								</div>
							)}
						</div>
					</div>

					{showMobileFilters && (
						<div
							className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
							onClick={toggleMobileFilters}
						/>
					)}

					<div className="flex-1 min-w-0">
						{filteredCourses.length === 0 ? (
							<div className="text-center text-gray-400 py-8 sm:py-12">
								<p className="text-lg sm:text-xl">
									No courses found matching your criteria.
								</p>
								<p className="mt-2 text-sm sm:text-base">
									Try adjusting your filters or search term.
								</p>
							</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2  gap-4 sm:gap-6">
								{filteredCourses.map((course: Course) => (
									<CourseCard key={course.id} course={course} />
								))}
							</div>
						)}

						<div className="mt-6 text-gray-400 text-sm">
							Showing {filteredCourses.length} of {coursesData.length} courses
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default CourseExplore;
