import {
  GlobeIcon,
  HeartIcon,
  LightingIcon,
  ShieldIcon,
} from "../../../../public/svg/generalSvg";
import MissionCard, { CardProps } from "./ourMissionCard";
const ourMission: CardProps[] = [
  {
    icon: <ShieldIcon />,
    title: "User Ownership",
    description:
      "Your data, your creations, your control. We believe users should own their digital assets and identity.",
  },
  {
    icon: <GlobeIcon />,
    title: "Global Connection",
    description:
      "Building bridges between people worldwide through decentralized technology that removes barriers.",
  },
  {
    icon: <LightingIcon />,
    title: "Seamless Experience",
    description:
      "Making Web3 accessible with clean, professional interfaces that feel familiar and intuitive.",
  },
  {
    icon: <HeartIcon />,
    title: "Community First",
    description:
      "Supporting creators and learners with minimal fees, maximizing value for our community.",
  },
];
function PrinciplesSection() {
  return (
    <section className="w-full py-32 relative flex flex-col gap-8 items-center justify-center">
      <div className="space-y-5 max-w-3xl text-center">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          Our Mission
        </h3>
        <p className="text-sm sm:text-base text-gray-300">
          Inspired by the great systems that connect people, we&apos;re building
          a platform where users truly own their data and creations while
          providing the cleanest, most professional experience in Web3
          education.
        </p>
      </div>
      <div className="flex gap-6 flex-wrap">
        {ourMission.map((mission, index) => (
          <MissionCard key={index} {...mission} />
        ))}
      </div>
    </section>
  );
}

export default PrinciplesSection;
