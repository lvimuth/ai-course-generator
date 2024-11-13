import React from "react";
import { HiOutlineClock, HiOutlineCheckCircle } from "react-icons/hi";

function ChapterList({ course }) {
  return (
    <div className="mt-3">
      <h2 className="font-medium text-xl">Chapters</h2>
      <div className="mt-2">
        {course?.courseOutput?.chapters?.map((chapter, index) => (
          <div className="mt-2 border p-5 rounded-lg md:flex items-center justify-between">
            <div className="md:flex gap-2 items-center mt-2">
              <h2 className="bg-primary h-10 w-10 text-white rounded-full text-center p-2 flex-none">
                {index + 1}
              </h2>
              <div>
                <h2 className="font-medium text-lg">{chapter?.chapter_name}</h2>
                <p className="text-sm text-gray-500">{chapter?.about}</p>
                <p className="flex gap-2 items-center text-primary">
                  <HiOutlineClock />
                  {chapter?.duration}
                </p>
              </div>
            </div>
            <HiOutlineCheckCircle className="text-4xl text-gray-300 flex-none" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterList;
