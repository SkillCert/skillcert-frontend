import { Users, BookOpen, Award, TrendingUp } from "lucide-react";

export default function StatisticsSection() {
  const stats = [
    {
      icon: Users,
      number: "1000+",
      label: "Active Students",
    },
    {
      icon: BookOpen,
      number: "500+",
      label: "Expert Courses",
    },
    {
      icon: Award,
      number: "200+",
      label: "Certificates Issued",
    },
    {
      icon: TrendingUp,
      number: "98%",
      label: "Success Rate",
    },
  ];

  return (
    <section className="bg-slate-900 py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Trusted by{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Industry Leaders
          </span>
        </h2>
        <p className="text-gray-400 text-base md:text-lg mb-12 md:mb-16 max-w-2xl mx-auto">
          Join the largest community of Web3 professionals and get certified by
          industry experts
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="font-poppins flex flex-col items-center"
            >
              <div className="bg-gradient-to-r from-[#7E22CE] via-[#59168B] to-[#831843] rounded-2xl p-3 md:p-4 mb-3 md:mb-4">
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-2xl md:text-[32px] font-bold text-white mb-2 md:mb-4">
                {stat.number}
              </div>
              <div className="text-gray-400 text-xs md:text-sm text-center">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

