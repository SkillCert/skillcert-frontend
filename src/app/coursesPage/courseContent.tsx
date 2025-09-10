"use client";
import Image from "next/image";

export default function CourseContentPage() {
  return (
    <div className="min-h-screen bg-[#151a23] text-white py-6">
      <div
        className="flex items-center justify-between mx-auto mb-12 mt-12"
        style={{ width: "1000px" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-white">←</span>
          <span
            className="text-[#a259ff] font-medium"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "48px",
              lineHeight: "100%",
            }}
          >
            Course name
          </span>
        </div>
        <div className="flex gap-4">
          <button
            className="bg-[#9D174D] text-white font-normal rounded-[25px]"
            style={{
              width: "160px",
              height: "50px",
              padding: "10px 20px",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "16px",
              lineHeight: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Preview
          </button>
          <button
            className="bg-[#9333EA] text-white font-semibold rounded-[25px]"
            style={{ width: "160px", height: "50px" }}
          >
            Publish
          </button>
        </div>
      </div>

      <div className="flex justify-center my-8 mb-12">
        <div
          className="flex gap-4 rounded-lg"
          style={{
            background: "#1F2937",
            width: "651px",
            height: "114px",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 32px",
          }}
        >
          <button
            className="bg-[#9D174D] text-white font-semibold rounded-[25px]"
            style={{ width: "189.54px", height: "50px", padding: "10px 20px" }}
          >
            Content
          </button>
          <button
            className="bg-[#9D174D] text-white font-semibold rounded-[25px]"
            style={{ width: "189.54px", height: "50px", padding: "10px 20px" }}
          >
            Settings
          </button>
          <button
            className="bg-[#9D174D] text-white font-semibold rounded-[25px]"
            style={{ width: "189.54px", height: "50px", padding: "10px 20px" }}
          >
            Pricing
          </button>
        </div>
      </div>

      <div
        className="flex items-center justify-between mb-6 mt-24 mx-auto"
        style={{ width: "1000px" }}
      >
        <h2
          className="text-[#a259ff] font-medium"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "40px",
            lineHeight: "100%",
          }}
        >
          Course Content
        </h2>
        <button
          className="bg-[#9333EA] text-white font-semibold rounded-[25px]"
          style={{ width: "250px", height: "50px" }}
        >
          Add Module
        </button>
      </div>

      <section
        className="rounded-lg mx-auto"
        style={{
          background: "#1F2937",
          width: "1000px",
          height: "296px",
          padding: "32px",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-bold">Module 1: Module name</h3>
            <span className="text-sm text-white">2 lessons</span>
          </div>
          <div className="flex gap-2">
            <button
              className="bg-[#9D174D] text-white font-semibold rounded-[25px]"
              style={{ width: "150px", height: "50px", padding: "10px 20px" }}
            >
              Edit
            </button>
            <button
              className="bg-[#9333EA] text-white font-semibold rounded-[25px]"
              style={{ width: "150px", height: "50px" }}
            >
              Delete
            </button>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-2">Lessons</h4>
          <ul className="mb-2">
            <li className="mb-4 ml-4 flex items-center justify-between">
              <span>• Lesson Name</span>
              <div className="flex gap-2">
                <button
                  className="bg-[#9D174D] text-white font-semibold rounded-[25px]"
                  style={{
                    width: "150px",
                    height: "50px",
                    padding: "10px 20px",
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-[#9333EA] text-white font-semibold rounded-[25px]"
                  style={{ width: "150px", height: "50px" }}
                >
                  Delete
                </button>
              </div>
            </li>
            <li className="mb-4 ml-4 flex items-center justify-between">
              <span>• Lesson Name</span>
              <div className="flex gap-2">
                <button
                  className="bg-[#9D174D] text-white font-semibold rounded-[25px]"
                  style={{
                    width: "150px",
                    height: "50px",
                    padding: "10px 20px",
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-[#9333EA] text-white font-semibold rounded-[25px]"
                  style={{ width: "150px", height: "50px" }}
                >
                  Delete
                </button>
              </div>
            </li>
            <li className="mb-4 ml-4 flex items-center justify-between">
              <button className="text-[#a259ff] focus:outline-none">
                • Add Lesson
              </button>
              <span />
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
