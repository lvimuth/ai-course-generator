"use client";

import { db } from "@/config/db";
import { Chapters, CourseList } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseBasics from "./_components/CourseBasics";
import CourseDetails from "./_components/CourseDetails";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { GenerateChapterContent_AI } from "@/config/AIModel";
import LoadingDialog from "../_components/LoadingDialog";
import service from "@/config/service";
import { useRouter } from "next/navigation";

function CourseLayout({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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

  const GenereteChapterContent = () => {
    setLoading(true);
    const chapters = course?.courseOutput?.chapters;

    chapters.forEach(async (chapter, index) => {
      const PROMPT =
        "Explain the concept in details on topic:" +
        course?.name +
        " ,Chapter: " +
        chapter?.chapter_name +
        " , in JSON format with lsit of array with fiels as title,description in details, code Example(<precode> format) if applicable.";
      console.log(PROMPT);
      try {
        let videoId = "";
        //Generate Video URL
        service
          .getVideos(course?.name + ":" + chapter?.chapter_name)
          .then((resp) => {
            console.log(resp);
            videoId = resp[0]?.id?.videoId;
          });

        //Generate chapter description
        const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
        console.log(result?.response?.text());
        const content = JSON.parse(result?.response?.text());

        // Save Chapter Content + Video URL
        await db.insert(Chapters).values({
          chapterId: index,
          courseId: course?.courseId,
          content: content,
          videoId: videoId,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }

      await db.update(CourseList).set({
        published: true,
      });
      router.replace("/create-course/" + course?.courseId + "/Finish");
    });
  };
  return (
    <div className="px-7 md:px-20 lg:px44">
      <h2 className="font-bold text-center text-5xl text-primary">
        Course Layout
      </h2>

      <LoadingDialog loading={loading} />
      {/* Basic Info */}
      <CourseBasics course={course} refreshData={() => GetCourse()} />

      {/* Course Details */}
      <CourseDetails course={course} />

      {/* List of Chapters or Lessons */}
      <ChapterList course={course} refreshData={() => GetCourse()} />

      <Button onClick={GenereteChapterContent} className="my-10">
        Gererate Course Content
      </Button>
    </div>
  );
}

export default CourseLayout;
