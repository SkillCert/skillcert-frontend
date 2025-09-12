import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LearningJourneySection() {
  const steps = [
    {
      number: "01",
      title: "Choose Your Path",
      description:
        "Select from our curated collection of expert-designed courses tailored to your career goals and skill level.",
    },
    {
      number: "02",
      title: "Learn & Practice",
      description:
        "Engage with interactive lessons, hands-on projects, and real-world scenarios to build practical skills.",
    },
    {
      number: "03",
      title: "Get Certified",
      description:
        "Earn industry-recognized certificates that validate your expertise and boost your professional credibility.",
    },
    {
      number: "04",
      title: "Join Community",
      description:
        "Connect with fellow learners, mentors, and industry experts in our thriving professional network.",
    },
  ];

  return (
    <section className="bg-slate-900 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-5xl mx-auto font-bold text-white max-w-xl mb-4 leading-[60px]">
          Your Journey to{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-purple-600 bg-clip-text text-transparent">
            Professional Excellence
          </span>
        </h2>
        <p className="text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
          Transform your career with our proven 4-step learning methodology
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-[#111827] to-[#020618] border border-gray-800 rounded-xl px-9 py-6 text-left"
            >
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-base font-bold w-[50px] h-[50px] flex justify-center items-center rounded-lg mb-3">
                {step.number}
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-200 hover:scale-105">
          Ready to start?
          <ArrowRight className="ml-2 w-5 h-5" />
          Begin your Journey
        </Button>
      </div>
    </section>
  );
}
