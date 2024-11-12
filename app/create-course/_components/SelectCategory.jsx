import { UserInputContext } from "@/app/_context/UserInputContext";
import CategoryList from "@/app/_shared/CategoryList";
import Image from "next/image";
import React, { useContext } from "react";

function SelectCategory() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({
      ...prev,
      category: category,
    }));
  };

  return (
    <div>
      <h2 className="my-5">Select the Course Category</h2>
      <div className="grid md:grid-cols-2 md:gap-2 xl:grid-cols-3 gap-10 px-10 md:px-20">
        {CategoryList.map((item, index) => (
          <div
            key={index}
            defaultValue={userCourseInput?.category}
            className={`group flex flex-col p-5 border items-center rounded-xl hover:border-primary hover:bg-gray-50 cursor-pointer ${
              userCourseInput?.category == item.name &&
              "border-primary bg-gray-50 "
            }`}
            title={item.name}
            onClick={() => handleCategoryChange(item.name)}
          >
            <Image src={item.icon} width={50} height={50} alt="" />
            <h2 className="hidden xl:block text-center md:text-sm">
              {item.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectCategory;
