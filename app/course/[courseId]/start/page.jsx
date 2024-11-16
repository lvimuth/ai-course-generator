"use client";

import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ChapterListCard from "./_components/ChapterListCard";

function CourseStart({ params }) {
  const [course, setCourse] = useState();
  useEffect(() => {
    GetCourse();
  }, []);

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId, params?.courseId));
    console.log(result);
    setCourse(result[0]);
  };
  return (
    <div>
      {/* Chapter list sidebar */}
      <div className="md:w-64 hidden md:block h-screen ">
        <h2 className="font-medium text-md bg-primary p-3 text-white">
          {course?.courseOutput?.course_name}
        </h2>
        <div>
          {course?.courseOutput?.chapters.map((chapter, index) => (
            <div key={index}>
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>
      {/* Content DIV */}
      <div className="md:ml-64"></div>
    </div>
  );
}

export default CourseStart;
