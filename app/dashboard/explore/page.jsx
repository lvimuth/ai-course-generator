"use client";
import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import React, { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";

function Explore() {
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    GetAllCourse();
  }, []);

  const GetAllCourse = async () => {
    const result = await db.select().from(CourseList).limit(9).offset(0);
    setCourseList(result);
    console.log(result);
  };
  return (
    <div>
      <h2 className="font-bold text-3xl">Explore More Projects</h2>
      <p>Explore more courses build with AI by other creators</p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {courseList.map((course, index) => (
          <div className="">
            <CourseCard course={course} displayUser={true} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;
