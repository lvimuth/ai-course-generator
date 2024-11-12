import React, { useContext } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserInputContext } from "@/app/_context/UserInputContext";

function TopicDescription() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  return (
    <div className="mx-1 lg:mx-10">
      {/* Topic */}
      <div className="mt-5">
        <label htmlFor="" className="text-xs md:text-sm">
          Write the topic for which you want to generate a course. (e.g. Python
          Course, Yoga steps for beginners)
        </label>
        <Input
          required
          placeholder={"Topic"}
          className="h-14 text-sm"
          onChange={(e) => {
            handleInputChange("topic", e.target.value);
          }}
        />
      </div>
      <div className="mt-5">
        <label htmlFor="" className="text-sm">
          Tell us more about your course, What you want to include in your
          course [optional]
        </label>
        <Textarea
          placeholder="About your course"
          className="h-24 text-sm"
          onChange={(e) => {
            handleInputChange("description", e.target.value);
          }}
        />
      </div>
      {/* Text area */}
    </div>
  );
}

export default TopicDescription;
