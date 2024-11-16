"use client";

import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseBasics from "../_components/CourseBasics";
import { useRouter } from "next/navigation";
import { HiOutlineClipboardList } from "react-icons/hi";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
  EmailIcon,
  WhatsappIcon,
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
} from "react-share";
import { LinkIcon } from "lucide-react";

function FinishScreen({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const router = useRouter();

  const courseUrl = `${process.env.NEXT_PUBLIC_HOST_NAME}/course/view/${course?.courseId}`;
  const emailSubject = `Check out this course: ${course?.courseOutput?.course_name}`;
  const emailBody = `Hi,\n\nI wanted to share this course with you: ${course?.courseOutput?.course_name}.\n\nYou can view it here: ${courseUrl}\n\nBest regards!`;

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
    <div className="px-1- md:px-20 my-7">
      <h2 className="text-center font-bold text-2xl my-3 text-primary">
        Congrats! Your course is ready{" "}
      </h2>

      <CourseBasics course={course} refreshData={() => console.log()} edit={false} />
      <h2 className="mt-3">Course URL:</h2>
      <div className="text-center text-gray-400 border p-2 rounded text-sm lg:flex gap-5 items-center justify-between">
        <span>{courseUrl}</span>

        <div className="flex gap-5 items-center p-3 justify-around lg:mt-0 ">
          <HiOutlineClipboardList
            className="h-7 w-7 cursor-pointer "
            onClick={async () => await navigator.clipboard.writeText(courseUrl)}
          />
          {/* Social Share Buttons */}
          <FacebookShareButton url={courseUrl} className="ml-2">
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton url={courseUrl} className="ml-2">
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <LinkedinShareButton url={courseUrl} className="ml-2">
            <LinkedinIcon size={32} round={true} />
          </LinkedinShareButton>
          <WhatsappShareButton url={courseUrl} className="ml-2">
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
          <EmailShareButton
            url={courseUrl}
            subject={emailSubject}
            body={emailBody}
            className="ml-2"
          >
            <EmailIcon size={32} round={true} />
          </EmailShareButton>
        </div>
      </div>
    </div>
  );
}

export default FinishScreen;
