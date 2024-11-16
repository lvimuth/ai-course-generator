"use client";
import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import React, { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";
import { Button } from "@/components/ui/button";

function Explore() {
  const [pageIndex, setPageIndex] = useState(0);
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    GetAllCourse();
  }, [pageIndex]);

  const GetAllCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .limit(10)
      .offset(pageIndex * 9);
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
      <div className="flex justify-between m-5">
        {pageIndex != 0 && (
          <Button onClick={() => setPageIndex(pageIndex - 1)}>
            Previous Page
          </Button>
        )}
        {courseList.length>9&&<Button onClick={() => setPageIndex(pageIndex + 1)}>Next Page</Button>}
      </div>
    </div>
  );
}

export default Explore;
