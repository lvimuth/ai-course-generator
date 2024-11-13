import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { HiOutlinePuzzle } from "react-icons/hi";
import EditCourseBasicInfo from "./EditCourseBasicInfo";

function CourseBasics({ course, refreshData }) {
  const [selectedFile, setSelectedFile] = useState();
  const onFileSelected = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setSelectedFile(URL.createObjectURL(file));
  };

  return (
    <div className="border rounded-xl shadow-md mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
        <div>
          <h2 className="font-bold text-3xl text-primary">
            {course?.courseOutput?.course_name}
            <EditCourseBasicInfo
              course={course}
              refreshData={() => refreshData(true)}
            />
          </h2>
          <p className="text-sm text-gray-400 mt-3">
            {course?.courseOutput?.description}
          </p>
          <h2 className="font-medium mt-2 mb-2 flex gap-2 items-center text-primary">
            <HiOutlinePuzzle />
            {course?.category}
          </h2>
          <Button className="w-full">Start</Button>
        </div>
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="upload-image">
            <Image
              src={selectedFile?selectedFile:"/placeholder.png"}
              width={100}
              height={100}
              alt=""
              className="object-cover rounded-xl text-primary cursor-pointer"
            />
          </label>
          <input
            type="file"
            id="upload-image"
            className="opacity-0"
            onChange={onFileSelected}
          />
        </div>
      </div>
    </div>
  );
}

export default CourseBasics;
