import Image from "next/image";
import WelcomePage from "./home/page";
import ErrorPage from "./error";


export default function Page() {
  return (
    <div className="">
      {/* <WelcomePage /> */}
      <ErrorPage />
    </div>
  );
}
