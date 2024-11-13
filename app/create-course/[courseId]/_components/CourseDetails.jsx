import React from "react";
import {
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineBookOpen,
  HiOutlinePlay,
} from "react-icons/hi";

function CourseDetails({ course }) {
  return (
    <div className="border p-6 rounded-xl shadow-sm mt-3">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="md:flex gap-3">
          <HiOutlineChartBar className="text-sm md:text-4xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-500">Skill Level</h2>
            <h2 className="font-medium text-lg">{course?.level}</h2>
          </div>
        </div>
        <div className="md:flex gap-3">
          <HiOutlineClock className="text-sm md:text-4xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-500">Duration</h2>
            <h2 className="font-medium text-lg">
              {course?.courseOutput?.duration}
            </h2>
          </div>
        </div>
        <div className="md:flex gap-3">
          <HiOutlineBookOpen className="text-sm md:text-4xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-500">No of Chapters</h2>
            <h2 className="font-medium text-lg">
              {course?.courseOutput?.chapters?.length}
            </h2>
          </div>
        </div>
        <div className="md:flex gap-3">
          <HiOutlinePlay className="text-sm md:text-4xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-500">Video Included?</h2>
            <h2 className="font-medium text-lg">{course?.includeVideos}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
