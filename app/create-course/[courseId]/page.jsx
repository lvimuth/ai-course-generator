"use client";

import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseBasics from "./_components/CourseBasics";
import CourseDetails from "./_components/CourseDetails";
import ChapterList from "./_components/ChapterList";

function CourseLayout({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  useEffect(() => {
    console.log(params);
    params && GetCourse();
  }, [params, user]);

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList.courseId, params?.courseId),
          eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    setCourse(result[0]);
    console.log(result);
  };
  return (
    <div className="px-7 md:px-20 lg:px44">
      <h2 className="font-bold text-center text-5xl text-primary">Course Layout</h2>

      {/* Basic Info */}
      <CourseBasics course={course} />

      {/* Course Details */}
      <CourseDetails course={course} />

      {/* List of Chapters or Lessons */}
      <ChapterList course={course} />
    </div>
  );
}

export default CourseLayout;
