"use client";

import { db } from "@/config/db";
import { Chapters, CourseList } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";
import Header from "@/app/dashboard/_components/header";


function CourseStart({ params }) {
  const [selectedChapter, setSelectedChapter] = useState();
  const [chapterContent, setChapterContent] = useState();
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
    GetSelectedChapterContent(0);
  };

  const GetSelectedChapterContent = async (chapterId) => {
    const result = await db
      .select()
      .from(Chapters)
      .where(
        and(
          eq(Chapters?.chapterId, chapterId),
          eq(Chapters?.courseId, course?.courseId)
        )
      );
    setChapterContent(result[0]);
    console.log(result);
  };

  return (
    <div>
      <div>
        <Header />
      </div>

      {/* Chapter list sidebar */}
      <div className="fixed md:w-64 hidden md:block h-screen ">
        <h2 className="font-medium text-md bg-primary p-3 text-white">
          {course?.courseOutput?.course_name}
        </h2>
        <div>
          {course?.courseOutput?.chapters.map((chapter, index) => (
            <div
              key={index}
              className={`cursor-pointer bg-gray-100 hover:bg-gray-200 ${
                selectedChapter?.chapter_name == chapter?.chapter_name
              }`}
              onClick={() => {
                setSelectedChapter(chapter);
                GetSelectedChapterContent(index);
              }}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>
      {/* Content DIV */}
      <div className="md:ml-64">
        <ChapterContent chapter={selectedChapter} content={chapterContent} />
      </div>
    </div>
  );
}

export default CourseStart;
