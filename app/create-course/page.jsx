"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  HiClipboardDocumentCheck,
  HiLightBulb,
  HiMiniSquares2X2,
} from "react-icons/hi2";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOption from "./_components/SelectOption";

function CreateCourse() {
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
  const [activeIndex, setActiveIndex] = useState(0);

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
                    activeIndex - 1 >= index && `bg-red-500`
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-10 md:px-10 lg:px-10 mt-10">
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
            <Button onClick={() => setActiveIndex(activeIndex + 1)}>
              Next
            </Button>
          )}
          {activeIndex == 2 && (
            <Button onClick={() => setActiveIndex(activeIndex + 1)}>
              Generate
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;
