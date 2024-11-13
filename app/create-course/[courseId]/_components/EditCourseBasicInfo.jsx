import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CourseList } from "@/config/schema";
import { eq } from "drizzle-orm";
import { db } from "@/config/db";

function EditCourseBasicInfo({ course }) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    setName(course?.courseOutput?.course_name);
    setDescription(course?.courseOutput?.description);
  }, [course]);

  const onUpdateHandler = async () => {
    course.courseOutput.course_name = name;
    course.courseOutput.description = description;

    console.log(course);

    const result = await db
      .update(CourseList)
      .set({
        courseOutput: course?.courseOutput,
      })
      .where(eq(CourseList?.id, course?.id))
      .returning({ id: CourseList.id });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <HiOutlinePencilAlt />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit course Title and Description</DialogTitle>
            <DialogDescription>
              <div className="mt-3">
                <label htmlFor="">Course Title</label>
                <Input
                  defaultValue={course?.courseOutput?.course_name}
                  onChange={(event) => {
                    setName(event?.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="">Course Discription</label>
                <Textarea
                  className="h-40"
                  defaultValue={course?.courseOutput?.description}
                  onChange={(event) => {
                    setDescription(event?.target.value);
                  }}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button onClick={onUpdateHandler}>Update</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditCourseBasicInfo;
