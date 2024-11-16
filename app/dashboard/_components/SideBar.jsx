"use client";

import Image from "next/image";
import React, { useContext } from "react";
import { TiHomeOutline } from "react-icons/ti";
import { GoStack } from "react-icons/go";
import { IoShieldOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { useClerk } from "@clerk/nextjs"; // Import Clerk's hook

function SideBar() {
  const { userCourseList } = useContext(UserCourseListContext);
  const { signOut } = useClerk(); // Destructure signOut from useClerk
  const path = usePathname();

  const Menu = [
    {
      id: 1,
      name: "Home",
      icon: <TiHomeOutline />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Explore",
      icon: <GoStack />,
      path: "/dashboard/explore",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: <IoShieldOutline />,
      path: "/dashboard/upgrade",
    },
  ];

  const handleLogout = async () => {
    try {
      await signOut(); // Trigger Clerk's signOut method
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md">
      <Link href={"/"}>
        <Image src={"/logo.svg"} alt="" width={160} height={100} />
      </Link>
      <hr className="my-3" />

      {Menu.map((item) => (
        <ul key={item.id}>
          <Link href={item.path}>
            <div
              className={`flex items-center gap-2 p-3 text-gray-500 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-2 ${
                item.path == path && "bg-gray-100 text-gray-900"
              }`}
            >
              <div className="text-2xl">{item.icon}</div>
              <h2>{item.name}</h2>
            </div>
          </Link>
        </ul>
      ))}

      <div
        className="flex items-center gap-2 p-3 text-gray-500 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-2"
        onClick={handleLogout}
      >
        <div className="text-2xl">
          <CiLogout />
        </div>
        <h2>Logout</h2>
      </div>

      <div className="absolute bottom-10 w-[80%]">
        <Progress value={(userCourseList?.length / 5) * 100} />
        <h2 className="text-xs text-center my-2">
          {userCourseList?.length} Out of 5 Courses created
        </h2>
        <h2 className="text-xs text-center text-gray-500 my-2">
          Upgrade your plan for unlimited course generate
        </h2>
      </div>
    </div>
  );
}

export default SideBar;
