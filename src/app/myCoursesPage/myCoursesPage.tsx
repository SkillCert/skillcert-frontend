import { Play, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/footer";

interface Course {
  id: number;
  name: string;
  description: string;
  nextLesson: string;
  level: string;
}

export default function MyCourses() {
  const courses: Course[] = [
    {
      id: 1,
      name: "Course Name",
      description: "Short course description",
      nextLesson: "Lesson Name",
      level: "Level",
    },
    {
      id: 2,
      name: "Course Name",
      description: "Short course description",
      nextLesson: "Lesson Name",
      level: "Level",
    },
    {
      id: 3,
      name: "Course Name",
      description: "Short course description",
      nextLesson: "Lesson Name",
      level: "Level",
    },
    {
      id: 4,
      name: "Course Name",
      description: "Short course description",
      nextLesson: "Lesson Name",
      level: "Level",
    },
  ];

  return (
    <div className="bg-slate-900 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-purple-400 mb-10">
          My courses
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="bg-[#1F2937] border-0 shadow-lg overflow-hidden"
            >
              <CardContent className="p-0 ">
                <div className="flex items-stretch ">
                  <ImageIcon className="w-32 h-40 object-cover bg-gray-100 " />

                  <div className="flex-1 p-4 pr-2">
                    <h3 className="font-semibold text-gray-100 text-2xl mb-1">
                      {course.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {course.description}
                    </p>
                    <p className="text-xs text-gray-200 mb-2">
                      <span className="font-medium">Next Lesson:</span>{" "}
                      {course.nextLesson}
                    </p>
                    <Badge
                      variant="secondary"
                      className="bg-[#121B2B] text-[#297ea8]  border-[#297ea8] hover:bg-blue-100 text-xs px-3 py-1"
                    >
                      {course.level}
                    </Badge>
                  </div>

                  <div className="p-4 pl-2 flex items-end ">
                    <Button
                      size="icon"
                      className="bg-purple-600 hover:bg-purple-700 rounded-full w-14 h-14 shadow-lg"
                    >
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
