"use client";

import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useContext } from "react";

function AddCourse() {
  const { user } = useUser();
  const { userCourseList, setUserCourseList } = useContext(
    UserCourseListContext
  );
  return (
    <div className="flex items-center justify-between flex-col md:flex-row gap-5">
      <div className="">
        <h2 className="text-2xl">
          Hello,{" "}
          <span className="font-bold">
            {user?.firstName[0].toUpperCase()}
            {user?.firstName.substring(1)} {user?.lastName[0].toUpperCase()}
            {user?.lastName.substring(1)}
          </span>
        </h2>
        <p className="text-sm text-gray-500">
          Create new course with AI, share with friends and Earn from it.
        </p>
      </div>
      
      <Link href={userCourseList>=5?'/dashboard/upgrade':"/create-course"}>
        <Button>+ Create AI Course</Button>
      </Link>
    </div>
  );
}

export default AddCourse;
