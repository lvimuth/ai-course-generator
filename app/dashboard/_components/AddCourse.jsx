"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";

function AddCourse() {
  const { user } = useUser();
  return (
    <div>
      <div>
        <h2 className="text-2xl">
          Hello,{" "}
          <span className="font-bold">
            {user?.firstName[0].toUpperCase()}
            {user?.firstName.substring(1)} {user?.lastName[0].toUpperCase()}
            {user?.lastName.substring(1)}
          </span>
        </h2>
      </div>
    </div>
  );
}

export default AddCourse;
