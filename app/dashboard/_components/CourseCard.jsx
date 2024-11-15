import Image from "next/image";
import React from "react";
import { HiOutlineBookOpen, HiOutlineChartBar } from "react-icons/hi";

function CourseCard({ course }) {
  return (
    <div className="shadow-md rounded-lg  flex flex-col border p-2 hover:scale-105 transition-all cursor-pointer">
      <div className="flex items-center justify-center ">
        <Image
          src={course?.courseBanner}
          alt=""
          width={300}
          height={300}
          className="w-[200px] h-[200px] object-cover rounded-lg"
        />
      </div>
      <div className="p-2">
        <h2 className="font-thin text-sm lg:font-medium ">
          {" "}
          {course?.courseOutput?.course_name}
        </h2>
        {console.log(course)}
        <p className="text-sm text-gray-400">{course?.category}</p>
        <div className="">
          <h2 className="font-thin text-sm flex gap-3 items-center p-1 px-3 text-primary bg-gray-200 rounded-xl my-2">
            <HiOutlineBookOpen /> {course?.courseOutput?.chapters.length}{" "}
            Chapters
          </h2>
          <h2 className="font-thin text-sm flex gap-3 items-center p-1 px-3 text-primary rounded-xl bg-slate-200">
            <HiOutlineChartBar />
            {course?.courseOutput?.difficulty_level} Level
          </h2>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
