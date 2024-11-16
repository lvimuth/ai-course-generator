import Image from "next/image";
import React from "react";
import {
  HiOutlineBookOpen,
  HiOutlineChartBar,
  HiDotsVertical,
} from "react-icons/hi";
import DropdownOption from "./DropdownOption";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";
import { CourseList } from "@/config/schema";

function CourseCard({ course, responseData, displayUser = false }) {
  const handleOnDelete = async () => {
    const resp = await db
      .delete(CourseList)
      .where(eq(CourseList.id, course?.id))
      .returning({ id: CourseList?.id });

    if (resp) {
      responseData();
    }
  };

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
        <h2 className="font-thin text-sm lg:font-medium flex justify-between items-center">
          {" "}
          {course?.courseOutput?.course_name}
          {!displayUser && (
            <DropdownOption
              handleOnDelete={() => handleOnDelete()}
              course={course}
            >
              <HiDotsVertical />
            </DropdownOption>
          )}
        </h2>
        {console.log(course)}
        <p className="text-sm text-gray-400">{course?.category}</p>
        <div className="lg:flex gap-2 mt-2 justify-between">
          <h2 className="font-thin text-sm flex gap-3 items-center p-1 px-3 text-primary bg-gray-200 rounded-xl mt-1">
            <HiOutlineBookOpen /> {course?.courseOutput?.chapters.length}{" "}
            Chapters
          </h2>
          <h2 className="font-thin text-sm flex gap-3 items-center p-1 px-3 text-primary rounded-xl bg-slate-200 mt-1">
            <HiOutlineChartBar />
            {course?.courseOutput?.difficulty_level}
          </h2>
        </div>
        {displayUser && (
          <div className="flex gap-2 items-center mt-2">
            <Image
              src={course?.userProfileImage}
              width={30}
              height={30}
              className="rounded-full"
            />
            <h2 className="text-sm">{course?.userName}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseCard;
