import React from "react";
import Image from "next/image";
import { FeaturedCourseProps } from "@/lib/interface";
import { Button } from "../ui/button";

const Card = ({ course }: { course: FeaturedCourseProps }) => {
  return (
    <div className="">
      <Image
        src={course.img}
        alt={course.title}
        width={30}
        height={30}
        className="h-1/2 w-full rounded-t-[20px]  object-cover"
      />
      <div className="bg-gray-800 grid gap-6 p-4  rounded-b-[20px]">
        <div className="grid gap-2">
          {" "}
          <h4 className="text-cyan-400 text-[15px]">{course.title}</h4>
          <p className="text-[14px] text-gray-400">{course.description}</p>
        </div>

        <Button className=" bg-purple-600 w-3/5 rounded-[25px] text-center hover:bg-purple-700 text-[15px]">
          Enroll now
        </Button>
      </div>
    </div>
  );
};

export default Card;
