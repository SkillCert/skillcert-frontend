// import ErrorTest from "@/components/ErrorTest";
import CourseExplorationSection from "./components/welcomepage/courseExplorationSection";
import HeroSection from "./components/welcomepage/heroSection";
// import Register from "../register/page";
import Journey from "./components/welcomepage/journey";
import Ready from "./components/welcomepage/ready";
import Steller from "./components/welcomepage/steller";
// import PrinciplesSection from "../about/components/principlesSection";
import Trusted from "./components/welcomepage/trusted";
// import PrinciplesSection from "../about/components/principlesSection";
import TeacherDashboard from "./teacherDashboard";

const welcomePage = () => {
  return (
    <div className="">
      <TeacherDashboard/>
      {/* <HeroSection /> */}
      <div className="">
        {/* <Trusted /> */}
        {/* <Journey /> */}
        {/* <CourseExplorationSection /> */}
        {/* <Steller /> */}
        {/* <ErrorTest /> */}

        <Ready />
      </div>
    </div>
  );
};

export default welcomePage;
