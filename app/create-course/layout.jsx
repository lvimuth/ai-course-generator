import React from "react";
import Header from "../dashboard/_components/header";
import SideBar from "../dashboard/_components/SideBar";

function CreateCourseLayout({ children }) {
  return (
    <div>
      <div className="md:w-64 hidden md:block">
        <SideBar />
      </div>
      <div className="md:ml-64">
        <Header />
        <div className="p-10">{children}</div>
      </div>
    </div>
  );
}

export default CreateCourseLayout;
