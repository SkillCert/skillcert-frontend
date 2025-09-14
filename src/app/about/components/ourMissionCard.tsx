import { ReactNode } from "react";

export interface CardProps {
  icon: ReactNode;
  title: string;
  description: string;
}
function MissionCard({ icon, title, description }: CardProps) {
  return (
    <div className="py-5 px-8 gap-5 flex flex-col bg-gray-900 rounded-xl border border-gray-800  max-w-[17.8rem] items-center justify-center">
      <div className="size-16 rounded-full bg-gradient-to-b from-pink-600 to-purple-600 flex items-center justify-center">
        {icon}
      </div>
      <p className="text-white font-bold">{title}</p>
      <p className="text-gray-400 text-sm text-center">{description}</p>
    </div>
  );
}
export default MissionCard;
