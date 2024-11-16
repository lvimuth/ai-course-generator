import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiOutlinePuzzle } from "react-icons/hi";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { storage } from "@/config/FireBaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

function CourseBasics({ course, refreshData, edit = true }) {
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    if (course) {
      setSelectedFile(course?.courseBanner);
    }
  }, [course]);

  const onFileSelected = async (event) => {
    const file = event.target.files[0];
    console.log(file);
    setSelectedFile(URL.createObjectURL(file));

    const fileName = Date.now() + "+.jpg";

    const storageRef = ref(storage, "ai-course/" + fileName);
    await uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("File uploaded successfully");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          console.log(downloadURL);
          await db
            .update(CourseList)
            .set({
              courseBanner: downloadURL,
            })
            .where(eq(CourseList.id, course?.id));
        });
      });
  };

  return (
    <div className="border rounded-xl shadow-md mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
        <div>
          <h2 className="font-bold text-3xl text-primary">
            {course?.courseOutput?.course_name}
            {edit && (
              <EditCourseBasicInfo
                course={course}
                refreshData={() => refreshData(true)}
              />
            )}
          </h2>
          <p className="text-sm text-gray-400 mt-3">
            {course?.courseOutput?.description}
          </p>
          <h2 className="font-medium mt-2 mb-2 flex gap-2 items-center text-primary">
            <HiOutlinePuzzle />
            {course?.category}
          </h2>
          {!edit && (
            <Link href={"/course/" + course?.courseId + "/start"}>
              <Button className="w-full">Start</Button>
            </Link>
          )}
        </div>
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="upload-image">
            {edit && (
              <Image
                src={selectedFile ? selectedFile : "/placeholder.png"}
                width={100}
                height={100}
                alt=""
                className="object-cover rounded-xl text-primary cursor-pointer"
              />
            )}
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
