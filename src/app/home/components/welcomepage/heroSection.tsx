"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { waves } from "../../../../../public/images";

const heroData = {
  title: {
    firstLine: "Master Skills That",
    secondLine: "Define Your Future",
    secondLineGradient:
      "bg-gradient-to-r from-cyan-400 to-purple-300 bg-clip-text text-transparent",
  },
  description:
    "Unlock your potential with cutting-edge online courses designed by industry experts. Transform your career with hands-on learning experiences.",
  ctaButton: {
    text: "Start Learning Today",
    image: "/next-page.svg",
    alt: "Next Page",
  },
};

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex overflow-hidden
      bg-[linear-gradient(to_right,#1F2937,#59168B,#9333EA,#59168B,#1F2937)]"
    >
      <div className="absolute inset-0 background z-20"></div>
      <div className="relative flex flex-col items-center text-center px-4 mt-[200px] max-w-4xl mx-auto z-30">
        <h1 className="flex flex-col gap-4 md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          <span>{heroData.title.firstLine}</span>
          <span className={heroData.title.secondLineGradient}>
            {heroData.title.secondLine}
          </span>
        </h1>

        <p className="text-[1rem] text-white mb-8 max-w-2xl mx-auto leading-relaxed">
          {heroData.description}
        </p>

        <Button
          className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600
            text-white font-bold px-6 py-6 rounded-[12px] text-lg shadow-lg hover:shadow-xl
            transition-all duration-300 transform hover:scale-105"
          size="lg"
        >
          {heroData.ctaButton.text}
          <Image
            src={heroData.ctaButton.image}
            alt={heroData.ctaButton.alt}
            width={20}
            height={20}
            className="ml-2"
          />
        </Button>
      </div>

      <div className="absolute bottom-0 w-full z-10">
        <Image src={waves} alt="wave" className="w-full" priority />
      </div>
    </section>
  );
}
