"use client";

import React, { useState } from "react";
import Header from "../dashboard/_components/header";
import SideBar from "../dashboard/_components/SideBar";
import { UserInputContext } from "../_context/UserInputContext";

function CreateCourseLayout({ children }) {
  const [userCourseInput, setUserCourseInput] = useState([]);

  return (
    <div>
      <UserInputContext.Provider
        value={{ userCourseInput, setUserCourseInput }}
      >
        <>
          {/* <div className="md:w-64 hidden md:block">
            <SideBar />
          </div> */}
          <div>
            <Header />
            <div className="p-3 lg:py-10">{children}</div>
          </div>
        </>
      </UserInputContext.Provider>
    </div>
  );
}

export default CreateCourseLayout;
