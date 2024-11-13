"use client";
import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import {
  HiClipboardDocumentCheck,
  HiLightBulb,
  HiMiniSquares2X2,
} from "react-icons/hi2";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOption from "./_components/SelectOption";
import { UserInputContext } from "../_context/UserInputContext";
import { GenerateCourseLayout_AI } from "@/config/AIModel";
import LoadingDialog from "./_components/LoadingDialog";
import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function CreateCourse() {
  const { user } = useUser();
  const StepperOption = [
    {
      id: 1,
      name: "Category",
      icon: <HiMiniSquares2X2 />,
    },
    {
      id: 2,
      name: "Topic & Desc...",
      icon: <HiLightBulb />,
    },
    {
      id: 3,
      name: "Options",
      icon: <HiClipboardDocumentCheck />,
    },
  ];
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);

  const checkStatus = () => {
    if (userCourseInput?.length == 0) {
      return true;
    }
    if (
      activeIndex == 0 &&
      (userCourseInput?.category?.length == 0 ||
        userCourseInput?.category == undefined)
    ) {
      return true;
    }
    if (
      activeIndex == 1 &&
      (userCourseInput?.topic?.length == 0 ||
        userCourseInput?.topic == undefined)
    ) {
      return true;
    } else if (
      activeIndex == 2 &&
      (userCourseInput?.level == undefined ||
        userCourseInput?.duration == undefined ||
        userCourseInput?.displayVideo == undefined ||
        userCourseInput?.noOfChapter == undefined)
    ) {
      return true;
    }
    return false;
  };

  const SaveCourseLayoutInDB = async (courseLayout) => {
    var id = uuid4();
    setLoading(true);
    const result = await db.insert(CourseList).values({
      courseId: id,
      name: userCourseInput?.topic,
      category: userCourseInput?.category,
      description: userCourseInput?.description,
      level: userCourseInput?.level,
      duration: userCourseInput?.duration,
      courseOutput: courseLayout,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      userProfileImage: user?.imageUrl,
    });
    console.log("Finished Course");
    router.replace("/create-course/" + id);
    setLoading(false);
  };

  const GenerateCourseLayout = async () => {
    setLoading(true);
    const BASIC_PROMPT =
      "generate a course tutorial on following details with field of Course Name, Description, Along with Chapter Name, About, Duration, ";
    const USER_INPUT_PROMPT =
      " Category : " +
      userCourseInput?.category +
      ", Topic: " +
      userCourseInput?.topic +
      " Description: " +
      userCourseInput?.description +
      " Difficulty Level: " +
      userCourseInput?.level +
      " Duration: " +
      userCourseInput?.duration +
      " No of Chapters: " +
      userCourseInput?.noOfChapter +
      ", in JSON format";
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
    console.log(FINAL_PROMPT);

    const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
    console.log(result.response?.text());
    console.log(JSON.parse(result.response?.text()));
    setLoading(false);
    SaveCourseLayoutInDB(JSON.parse(result.response?.text()));
  };

  return (
    <div>
      {/* Stepper */}
      <div className="flex flex-col justify-center items-center mt-5">
        <h2 className="text-4xl text-primary font-medium">Create Course</h2>
        <div className="flex mt-10">
          {StepperOption.map((item, index) => (
            <div key={item.id} className="flex flex-center ">
              <div className="flex flex-col items-center w-[50px] md:w-[120px]  ">
                <div
                  className={`bg-gray-200 p-3 rounded-full text-white ${
                    activeIndex >= index && "bg-gray-500"
                  }`}
                >
                  {item.icon}
                </div>
                <h2 className="hidden md:block md:text-sm">{item.name}</h2>
              </div>
              {index !== StepperOption?.length - 1 && (
                <div
                  className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 mt-5 ${
                    activeIndex - 1 >= index && `bg-gray-500`
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-1 md:px-10 lg:px-10 mt-10">
        {/* Componect */}
        {activeIndex == 0 ? (
          <SelectCategory />
        ) : activeIndex == 1 ? (
          <TopicDescription />
        ) : activeIndex == 2 ? (
          <SelectOption />
        ) : null}

        {/* Next previous button */}
        <div className="flex justify-between mt-10">
          <Button
            disabled={activeIndex == 0}
            onClick={() => setActiveIndex(activeIndex - 1)}
            variant="outline"
          >
            Back
          </Button>
          {activeIndex < 2 && (
            <Button
              onClick={() => setActiveIndex(activeIndex + 1)}
              disabled={checkStatus()}
            >
              Next
            </Button>
          )}
          {activeIndex == 2 && (
            <Button
              onClick={() => GenerateCourseLayout()}
              disabled={checkStatus()}
            >
              Generate Course Layout
            </Button>
          )}
        </div>
      </div>
      <LoadingDialog loading={loading} />
    </div>
  );
}

export default CreateCourse;
