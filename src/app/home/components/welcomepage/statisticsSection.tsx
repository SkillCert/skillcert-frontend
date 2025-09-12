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
    <section className="bg-slate-900 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Trusted by{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Industry Leaders
          </span>
        </h2>
        <p className="text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
          Join the largest community of Web3 professionals and get certified by
          industry experts
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="font-poppins flex flex-col items-center"
            >
              <div className="bg-gradient-to-r from-[#7E22CE] via-[#59168B] to-[#831843] rounded-2xl p-4 mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-[32px] font-bold text-white mb-4">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
