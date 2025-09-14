import React from "react";
import { GraduationCap, Book, CheckCircle, Users } from "lucide-react";

const trustedData = [
  {
    icon: <Users className="w-8 h-8 text-white" />,
    stat: "1000+",
    label: "Active Students",
  },
  {
    icon: <Book className="w-8 h-8 text-white" />,
    stat: "500+",
    label: "Expert Courses",
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-white" />,
    stat: "200+",
    label: "Certificates Issued",
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-white" />,
    stat: "98%",
    label: "Success Rate",
  },
];

const Trusted = () => {
  return (
    <main className="bg-gradient-to-b from-gray-950 to-gray-800 py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-12">
          <h2 className="text-4xl text-white font-bold mb-3">
            Trusted by
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent ml-2">
              Industry Leaders
            </span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Join the largest community of Web3 professionals and get certified
            by industry experts
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-12">
          {trustedData.map((item, index) => (
            <div
              key={index}
              className="w-[200px] p-6    rounded-xl backdrop-blur-lg border border-white/10 shadow-lg text-center bg-gradient-to-br from-purple-500/20 to-pink-500/20"
            >
              <div className="p-4  mb-4 rounded-full inline-flex justify-center items-center bg-gradient-to-r from-purple-600 to-pink-500/80">
                {item.icon}
              </div>
              <p className="text-xl font-bold text-white">{item.stat}</p>
              <p className="text-white/70">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Trusted;
