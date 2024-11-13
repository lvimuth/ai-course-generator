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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";
import { CourseList } from "@/config/schema";

function EditChapter({ course, index ,refreshData}) {
  const Chapters = course?.courseOutput?.chapters;

  const [name, setName] = useState();
  const [about, setAbout] = useState();
  useEffect(() => {
    setName(Chapters[index].chapter_name);
    setAbout(Chapters[index].about);
  }, [course]);

  const onUpdateHandler = async () => {
    Chapters[index].chapter_name = name;
    Chapters[index].about = about;

    const result = await db
      .update(CourseList)
      .set({
        courseOutput: course?.courseOutput,
      })
      .where(eq(CourseList?.id, course?.id))
      .returning({ id: CourseList.id });

    console.log(result);
    refreshData(true);
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <HiOutlinePencilAlt />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Chapter</DialogTitle>
            <DialogDescription>
              <div className="mt-3">
                <label htmlFor="">Course Title</label>
                <Input
                  defaultValue={Chapters[index].chapter_name}
                  onChange={(event) => {
                    setName(event?.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="">Course Discription</label>
                <Textarea
                  className="h-40"
                  defaultValue={Chapters[index].about}
                  onChange={(event) => {
                    setAbout(event?.target.value);
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

export default EditChapter;
