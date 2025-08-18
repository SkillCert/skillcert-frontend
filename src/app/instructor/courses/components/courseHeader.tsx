"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function CourseHeader() {
    return (
        <header className="bg-slate-900 font-poppins h-[155px] px-[7px] flex items-center justify-between my-6 border border-yellow-400">
            <div className="flex flex-col gap-y-5 items-start justify-center h-[103px">
                <h1 className="text-white leading-[100%] text-[40px] font-medium align-top">Course management</h1>
                <div className="bg-pink-500 flex items-center justify-center text-white text-[16px] hover:bg-pink-600 py-[6px] px-[12px] rounded-md">
                    Draft
                </div>
            </div>

            <div className="flex items-center gap-5 font-semibold font-sans">
                <Button variant="secondary" className="bg-gray-800 text-gray-400 py-[6px] px-[12px] justify-center items-center gap-[10px] rounded-xl hover:bg-gray-700">
                    <Image src="/svg/Save.svg" alt="publish course" width={20} height={20} />
                    Save Draft
                </Button>

                <Button className="bg-purple-600 flex justify-center py-[6px] px-[12px] items-center gap-[10px] text-white leading-[100%] hover:bg-purple-700 rounded-xl">
                    <Image src="/svg/Eye.svg" alt="save draft" width={20} height={20} />
                    Publish Course
                </Button>
            </div>
        </header>
    )
}
