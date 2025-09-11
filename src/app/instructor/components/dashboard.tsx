import { Users, DollarSign, Clock, BookOpen, CirclePlus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const totalCourses = 0
const publishedCourses = 0
const totalStudents = 0
const totalRevenue = 0.00
const averageRating: number | null = null

export default function Dashboard() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Instructor Overview</h1>
          <p className="mt-2">Manage your courses and track your teaching impact</p>
        </div>
        <Button variant="default" className="bg-purple-600 rounded-lg hover:bg-purple-700">
          <CirclePlus className="h-4 w-4" />
          Create Course
        </Button>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-transparent text-white border-[#9CA3AF]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCourses}</div>
            <p className="text-xs mt-2 text-[#D1D5DB]">{publishedCourses} published</p>
          </CardContent>
        </Card>

        <Card className="bg-transparent text-white border-[#9CA3AF]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs mt-2 text-[#D1D5DB]">Across all courses</p>
          </CardContent>
        </Card>

        <Card className="bg-transparent text-white border-[#9CA3AF]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs mt-2 text-[#D1D5DB]">Lifetime earnings</p>
          </CardContent>    
        </Card>

        <Card className="bg-transparent text-white border-[#9CA3AF]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <Clock className="h-4 w-4 " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating ? averageRating.toFixed(1) : "—"}</div>
            <p className="text-xs mt-2 text-[#D1D5DB]">No ratings yet</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#111827] text-white border-[#1F2937]">  
        <CardHeader>
          <CardTitle className="text-xl">Recent Activity</CardTitle>
          <p className="text-slate-400">Your latest course updates and student interactions</p>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="mb-6 ">
            <Image src="/openbookgrey.svg" alt="No courses created yet" width={60} height={60} className="text-slate-400 w-16 h-16" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">No courses created yet</h3>
          <p className="mb-6 text-center text-[#D1D5DB]">
            Start sharing your knowledge by creating your first course
          </p>
        </CardContent>
      </Card>
    </div>
  )
}