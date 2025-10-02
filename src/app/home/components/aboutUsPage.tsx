// Reusable components
import { ReactNode } from "react";

type PurpleHeadingProps = {
  children: ReactNode;
  className?: string;
};

const PurpleHeading = ({ children, className = "" }: PurpleHeadingProps) => (
  <h2 className={`font-bold ${className}`} style={{ color: "#9333EA" }}>
    {children}
  </h2>
);

const ListItem = ({ children }: { children: ReactNode }) => (
  <li className="flex items-start">
    <span className="mr-3 mt-1.5 w-2 h-2 rounded-full bg-white"></span>
    {children}
  </li>
);

const features = [
  "Issue NFT-based digital certificates on the Stellar blockchain",
  "Guarantee authenticity, traceability, and resistance to forgery",
  "Operate an educational marketplace for courses and validated certificates issuance",
];

export default function AboutSkillCert() {
  return (
    <div className="max-w-5xl bg-gray-900 text-white sm:px-6 lg:px-8 px-4 h- mx-auto py-10">
      <PurpleHeading className="text-4xl mb-4">About skillcert</PurpleHeading>
      <p className="text-lg text-gray-300 mb-12">
        Empowering learners with cutting-edge online courses
      </p>
      <PurpleHeading className="text-3xl mb-6">
        What is skillcert ?
      </PurpleHeading>

      <p className="text-gray-300 sm:text-lg md:text-xl leading-relaxed text-base">
        SkillCert is a revolutionary platform that issues NFT-based digital
        certificates on the Stellar blockchain, ensuring authenticity,
        traceability, and forgery resistance. Designed for universities,
        academies, and companies, the platform enables trusted verification of
        digital achievements and skills. Additionally, SkillCert features an
        educational marketplace where institutions offer courses paired with
        automated, validated certificate issuance.
      </p>

      <PurpleHeading className="text-xl sm:text-2xl md:text-3xl my-6">
        Innovation education
      </PurpleHeading>

      <ul className="space-y-3 mt-4 text-sm sm:text-base text-gray-300">
        {features.map((feature, index) => (
          <ListItem key={index}>{feature}</ListItem>
        ))}
      </ul>
    </div>
  );
}
