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
    <div className="bg-gray-900 text-white px-[6.8em] h- mx-auto py-[6em]">
      <PurpleHeading className="text-4xl mb-4">About skillcert</PurpleHeading>
      <p className="text-lg text-gray-300 mb-12">
        Empowering learners with cutting-edge online courses
      </p>
      <PurpleHeading className="text-3xl mb-6">
        What is skillcert ?
      </PurpleHeading>

      <p className="text-gray-300 leading-relaxed mb-12 text-base">
        SkillCert is a revolutionary platform that issues NFT-based digital
        certificates on the Stellar blockchain, ensuring authenticity,
        traceability, and forgery resistance. Designed for universities,
        academies, and companies, the platform enables trusted verification of
        digital achievements and skills. Additionally, SkillCert features an
        educational marketplace where institutions offer courses paired with
        automated, validated certificate issuance.
      </p>

      <PurpleHeading className="text-3xl mb-6">
        Innovation education
      </PurpleHeading>

      <ul className="space-y-3 text-gray-300">
        {features.map((feature, index) => (
          <ListItem key={index}>{feature}</ListItem>
        ))}
      </ul>
    </div>
  );
}
