import CourseExplorationSection from "./components/welcomepage/courseExplorationSection";
import HeroSection from "./components/welcomepage/heroSection";
import Journey from "./components/welcomepage/journey";
import Ready from "./components/welcomepage/ready";
import Steller from "./components/welcomepage/steller";
import Trusted from "./components/welcomepage/trusted";
import StatisticsSection from "./components/welcomepage/statisticsSection";

const welcomePage = () => {
  return (
    <div className="">
      <HeroSection />
      <div className="">
        <Trusted />
        <Journey />
        <CourseExplorationSection />
        <Steller />
        <StatisticsSection />
        <Ready />
      </div>
    </div>
  );
};

export default welcomePage;
