import CategoryList from "@/app/_shared/CategoryList";
import Image from "next/image";
import React from "react";

function SelectCategory() {
  return (
    <div>
      <h2 className="my-5">Select the Course Category</h2>
      <div className="grid md:grid-cols-2 md:gap-2 xl:grid-cols-3 gap-10 px-10 md:px-20">
        {CategoryList.map((item, index) => (
          <div
            key={index}
            className="group flex flex-col p-5 border items-center rounded-xl hover:border-primary hover:bg-gray-50 cursor-pointer"
            title={item.name}
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
