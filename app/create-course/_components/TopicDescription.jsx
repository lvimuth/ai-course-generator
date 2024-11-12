import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function TopicDescription() {
  return (
    <div className="mx-1 lg:mx-10">
      {/* Topic */}
      <div className="mt-5">
        <label htmlFor="" className="text-xs md:text-sm">
          Write the topic for which you want to generate a course. (e.g. Python
          Course, Yoga steps for beginners)
        </label>
        <Input placeholder={"Topic"} />
      </div>
      <div className="mt-5">
        <label htmlFor="" className="text-sm">
          Tell us more about your course, What you want to include in your
          course [optional]
        </label>
        <Textarea placeholder="About your course" />
      </div>
      {/* Text area */}
    </div>
  );
}

export default TopicDescription;
